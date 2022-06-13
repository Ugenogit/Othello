let you = {player:"A", stone:"●"};

function Player(){
    document.getElementById("player").innerHTML = you.player;
    document.getElementById("player-stone").innerHTML = you.stone;
}
Player();

function GiveId(){
    const cell_all = document.querySelectorAll("td");
    for(let r=0; r<10; r++){
        for(let c=0; c<10; c++){
            let cell_index = 10 * r + c;
            cell_all[cell_index].id = `stone${r}-${c}`;
            if((r>0 && r<9) && (c>0 && c<9)){
                cell_all[cell_index].classList = "stone";
                cell_all[cell_index].onclick = PutStone;
                if((r == 4 || r == 5) && (c == 4 || c == 5)){
                    cell_all[cell_index].dataset.status = 1;    //石のある場所は1
                }else{
                    cell_all[cell_index].dataset.status = 0;    //石のない場所は1
                }
            }else{
                cell_all[cell_index].dataset.status = 2;    //盤外は2
            }
        };
    };
};
GiveId();

function PutStone(){
    const this_r = Number(this.id.match(/\d+/g)[0]);
    const this_c = Number(this.id.match(/\d+/g)[1]);
    const status_around ={
                        "above":document.getElementById(`stone${this_r-1}-${this_c}`).dataset.status,
                        "under":document.getElementById(`stone${this_r+1}-${this_c}`).dataset.status,
                        "right":document.getElementById(`stone${this_r}-${this_c+1}`).dataset.status,
                        "left":document.getElementById(`stone${this_r}-${this_c-1}`).dataset.status
                        };

    if(this.innerHTML != ""){
        alert("Error: Already exists!");
    }else if(status_around.above != 1 && status_around.under != 1 && status_around.right != 1 && status_around.left != 1){
        alert("Error: Put to other cell!");
    }else{
        ReverseCheck_N(this_r, this_c, this.id);
        ReverseCheck_E(this_r, this_c, this.id);



        if(you.player == "A"){
            you.player = "B";
            you.stone = "○";
        }else{
            you.player = "A";
            you.stone = "●";
        };
        this.dataset.status = 1;
    };
}

function ReverseCheck_N(this_r, this_c, id){
    //上方向にチェック
        //1つ上を見る。石がない/同じ石なら終了。違う石ならもう一つ上を見る
    let check_r = this_r - 1;
    let check_c = this_c;
    let stone_other_side = "absent";
    let another_stone_num = 0;
    console.log(`this_id: ${id}`);
    console.log(`you.stone = ${you.stone}`);
    for(let i=0; i<100; i++){
        let check_stone = document.getElementById(`stone${check_r}-${check_c}`);
        if(check_stone.dataset.status == 2 || check_stone.innerHTML == ""){
            console.log("チェック終了：裏返し無し")
            break;
        }else if(check_stone.innerHTML == you.stone){
            console.log("チェック終了：同色の石");
            stone_other_side = "exist";
            break;
        }else{
            check_r = check_r - 1;
            another_stone_num = another_stone_num + 1;
        }
    };
    if(stone_other_side == "exist" && another_stone_num > 0){
        document.getElementById(id).innerHTML = you.stone;
        for(let i=0; i<another_stone_num; i++){
            document.getElementById(`stone${this_r - i - 1}-${this_c}`).innerHTML = you.stone;
        };
    };
}

function ReverseCheck_E(this_r, this_c, id){
    //上方向にチェック
        //1つ上を見る。石がない/同じ石なら終了。違う石ならもう一つ上を見る
    let check_r = this_r;
    let check_c = this_c + 1;
    let stone_other_side = "absent";
    let another_stone_num = 0;
    console.log(`you.stone = ${you.stone}`);
    for(let i=0; i<100; i++){
        console.log(`i: ${i}`);
        let check_stone = document.getElementById(`stone${check_r}-${check_c}`);
        if(check_stone.dataset.status == 2 || check_stone.innerHTML == ""){
            console.log("チェック終了：裏返し無し")
            break;
        }else if(check_stone.innerHTML == you.stone){
            console.log("チェック終了：同色の石");
            stone_other_side = "exist";
            break;
        }else{
            check_c = check_c + 1;
            another_stone_num = another_stone_num + 1;
        }
    };
    if(stone_other_side == "exist" && another_stone_num > 0){
        document.getElementById(id).innerHTML = you.stone;
        for(let i=0; i<another_stone_num; i++){
            document.getElementById(`stone${this_r}-${this_c + i + 1}`).innerHTML = you.stone;
        };
    };
    // if(stone_other_side == "exist" && another_stone_num > 0){
    //     for(let i=0; i<another_stone_num; i++){
    //         document.getElementById(`stone${this_r+i}-${this_c}`).innerHTML = you.stone;
    //     }
    // }
}

function test(){

}
test();

//相手プレイヤーが奥まで自分は待機
//クリックしたらそのプレイヤーの石を置く
    //置ける場所の制限
        //すでに石がある場所には置けない
        //どれかの石の上下左右にしか置けない
        //石を取れない場所には置けない
//裏返し判定
//相手の画面にも同期
//中止ボタン
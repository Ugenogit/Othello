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
    const directions = ["N","NE","E","SE","S","SW","W","NW"];
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
        for(let i=0; i<directions.length; i++){
            Reverse(this_r, this_c, this.id, directions[i]);
        }
        if(you.player == "A"){
            you.player = "B";
            you.stone = "○";
        }else{
            you.player = "A";
            you.stone = "●";
        };
        Player();
        this.dataset.status = 1;
    };
}

function Reverse(this_r, this_c, id, direction){
    let check_r
    let check_c
    if(direction == "N"){
        check_r = this_r - 1;
        check_c = this_c;
    }else if(direction == "NE"){
        check_r = this_r - 1;
        check_c = this_c + 1;
    }else if(direction == "E"){
        check_r = this_r;
        check_c = this_c + 1;
    }else if(direction == "SE"){
        check_r = this_r + 1;
        check_c = this_c + 1;
    }else if(direction == "S"){
        check_r = this_r + 1;
        check_c = this_c;
    }else if(direction == "SW"){
        check_r = this_r + 1;
        check_c = this_c - 1;
    }else if(direction == "W"){
        check_r = this_r;
        check_c = this_c - 1;
    }else if(direction == "NW"){
        check_r = this_r - 1;
        check_c = this_c - 1;
    }
    let stone_other_side = "absent";
    let another_stone_num = 0;
    // console.log(`you = player:${you.player}, stone:${you.stone}`);
    // console.log(`this_id: ${id}`);
    for(let i=0; i<100; i++){
        let check_stone = document.getElementById(`stone${check_r}-${check_c}`);
        if(check_stone.dataset.status == 2 || check_stone.innerHTML == ""){
            // console.log("チェック終了：裏返し無し")
            break;
        }else if(check_stone.innerHTML == you.stone){
            // console.log("チェック終了：自分の石がある");
            stone_other_side = "exist";
            break;
        }else{
            if(direction == "N"){
                check_r = check_r - 1;
                check_c = check_c;
            }else if(direction == "NE"){
                check_r = check_r - 1;
                check_c = check_c + 1;
            }else if(direction == "E"){
                check_r = check_r;
                check_c = check_c + 1;
            }else if(direction == "SE"){
                check_r = check_r + 1;
                check_c = check_c + 1;
            }else if(direction == "S"){
                check_r = check_r + 1;
                check_c = check_c;
            }else if(direction == "SW"){
                check_r = check_r + 1;
                check_c = check_c - 1;
            }else if(direction == "W"){
                check_r = check_r;
                check_c = check_c - 1;
            }else if(direction == "NW"){
                check_r = check_r - 1;
                check_c = check_c - 1;
            }
            another_stone_num = another_stone_num + 1;
        }
    };
    if(stone_other_side == "exist" && another_stone_num > 0){
        console.log(`${direction}方向に裏返しました`);
        //石を置く
        document.getElementById(id).innerHTML = you.stone;
        //各方向を裏返す
        if(direction == "N"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r - 1 - i}-${this_c}`).innerHTML = you.stone;
            };
        }else if(direction == "NE"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r - 1 - i}-${this_c + 1 + i}`).innerHTML = you.stone;
            };
        }else if(direction == "E"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r}-${this_c + 1 + i}`).innerHTML = you.stone;
            };
        }else if(direction == "SE"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r + 1 + i}-${this_c + 1 + i}`).innerHTML = you.stone;
            };
        }else if(direction == "S"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r + 1 + i}-${this_c}`).innerHTML = you.stone;
            };
        }else if(direction == "SW"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r + 1 + i}-${this_c - 1 - i}`).innerHTML = you.stone;
            };
        }else if(direction == "W"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r}-${this_c - 1 - i}`).innerHTML = you.stone;
            };
        }else if(direction == "NW"){
            for(let i=0; i<another_stone_num; i++){
                document.getElementById(`stone${this_r - 1 - i}-${this_c - 1 - i}`).innerHTML = you.stone;
            };
        };
    };
};

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

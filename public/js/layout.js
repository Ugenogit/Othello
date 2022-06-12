const board_area = document.getElementById("board");
const br = document.createElement("br");

for(let i=0; i<8; i++){
    for(let j=0; j< 8; j++){
        let btn = document.createElement("button");
        btn.innerHTML = "";
        btn.classList = "stone";
        btn.id = `stone${i}-${j}`;

        board_area.appendChild(btn);
        console.log("hello js");
    }
    board_area.appendChild(br);
}

const instructorName = document.querySelector(".instructorName");

const MT = document.querySelector(".Mauy-Thai");
const JU = document.querySelector(".Judo");
const BJ = document.querySelector(".BJJ");

const MA = [MT, JU, BJ];

class InstructorSec {

  selection = () => {
    for (let i = 0; i < MA.length; i++) {
      console.log(MA[i]);
      const clicked = MA[i];
      clicked.addEventListener("click", (e) => {
        console.log(e.target);
        fetch("../../info.json")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (e.target.src === "http://127.0.0.1:5500/assets/Buakaw2.png") {
              instructorName.textContent = data[0].information;
            } else if (
              e.target.src === "http://127.0.0.1:5500/assets/judo.png"
            ) {
              instructorName.textContent = data[1].instructorName;
            } else {
              instructorName.textContent = data[2].instructorName;
            }
          })
          .catch((error) => console.log(error));
      });
    }
  };
}

const execute = new InstructorSec();
execute.selection();

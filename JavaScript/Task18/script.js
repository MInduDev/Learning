  const greetUser = () => {
            let userName = document.getElementById("name").value;

            if(userName===""){
                document.getElementById("heading").innerText="Hello";
            }
            else{
                document.getElementById("heading").innerText="Hello, " + userName;
            }
        }

        document.getElementById("red").onclick=function(){
            this.style.backgroundColor="red";
            this.style.color="white";
        }

        document.getElementById("blue").onclick=function(){
            this.style.backgroundColor="blue";
            this.style.color="white";
        }

        document.getElementById("green").onclick=function(){
            this.style.backgroundColor="green";
            this.style.color="white";
        }

        document.getElementById("yellow").onclick=function(){
            this.style.backgroundColor="yellow";
            this.style.color="black";
        }

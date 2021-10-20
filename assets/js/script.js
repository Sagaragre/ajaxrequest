document.onload = fetchnewdata();
var btn = document.querySelector(".more");
btn.innerHTML="load more";
btn.addEventListener('click',fetchnewdata);

var j = 0 ;

function fetchnewdata() {
    var xhr = new XMLHttpRequest();

    xhr.open('get', 'https://jsonplaceholder.typicode.com/posts', true);

    xhr.onload = function () {
        if(this.status === 200) {
            var obj = JSON.parse(this.responseText);
            var cond = obj.length - 1;
        
            for( var i = j; i < (j + 6); i++) {
                if(i >= cond) {
                    document.querySelector(".more").classList.add("hide");
                }

                var title = obj[i].title;
                var info =obj[i].body;
                var newli = document.createElement('li');
                newli.setAttribute('class', 'blog');
                var h2 = document.createElement('h2');
                h2.innerText= title;
                var para = document.createElement('p');
                para.innerText=info;
                newli.appendChild(h2);
                newli.appendChild(para);
                var ulcontainer = document.querySelector(".fetchdata");
                ulcontainer.appendChild(newli);
            }
            
            j += 6;

            var btnless = document.querySelector(".less");
            var data = document.querySelectorAll(".blog");
            var datalength = data.length;
            if(data.length > 6 ) {
                btnless.classList.replace('hideless','showless');
                function removeData() {
                    for( var k = datalength - 1; k >= (datalength - 6); k--) {
                        data[k].remove();
                        btnless.classList.replace('showless','hideless');
                    }
                    
                }
            } 

            btnless.addEventListener('click',removeData);
            
        } else {
            console.log('some error to fetch data');
        }  
    }
    xhr.send();   
}

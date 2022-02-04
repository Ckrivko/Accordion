function solution() {

   async function getList(input) {

      let res = await fetch(input)

      let data = await res.json();

      return data;

   }

   getList('http://localhost:3030/jsonstore/advanced/articles/list')
      .then(res => {

         res.forEach(el => {


            getList(`http://localhost:3030/jsonstore/advanced/articles/details/${el._id}`)
               .then(response => {



                  let divAcordion = document.createElement('div')
                  divAcordion.className = 'accordion';
                  let divHead = document.createElement('div');
                  divHead.className = 'head';
                  let divExtra = document.createElement('div');
                  divExtra.className = 'extra';
                  let p = document.createElement('p');
                  p.textContent = response.content;

                  let spanTitle = document.createElement('span');
                  spanTitle.textContent = el.title;

                  let button = document.createElement('button')
                  button.className = 'button';
                  button.id = `${el._id}`;
                  button.textContent = 'More';

                  button.addEventListener('click', MoreLessInfo);

                  divHead.appendChild(spanTitle);
                  divHead.appendChild(button);

                  divExtra.appendChild(p);

                  divAcordion.appendChild(divHead);
                  divAcordion.appendChild(divExtra)

                  let mainEl = document.getElementById('main')

                  mainEl.appendChild(divAcordion);



               })


         })
      })

   function MoreLessInfo(e) {

      let textEl = e.target.parentNode.nextSibling;

      if (e.target.textContent == 'More') {

         textEl.style.display = 'block';
         console.log('Yes');
         e.target.textContent = 'Less'
      }
      else {

         console.log('No');
         e.target.textContent = 'More'
         textEl.style.display = 'none';

      }
   }

}

solution();


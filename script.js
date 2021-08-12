let b7validator = {
    handlersubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input')

        b7validator.clearErrors();

        for(let i = 0; i < inputs.length; i++)
        {
            let input = inputs[i];
            let check = b7validator.checkinput(input);
            if (check !== true)
            {
                send = false;
                b7validator.showError(input, check)
            }
        }

        send = false;
        if(send)
        {
            form.submit();
        }
       
    }, checkinput:(input) => 
       {
            let rules = input.getAttribute(`data-rules`)

            if (rules !== null)
            {
                rules = rules.split('|');
                for (let k in rules)
                {
                    let rdetails = rules[k].split('=');
                    switch (rdetails[0])
                    {
                        case `required`:
                            if (input.value == ``)
                            {
                                return `Campo não pode ser vazio.`;
                            }

                        break;
                         case `min`:
                            if (input.value.length < rdetails[1])
                            {
                                return `Campo tem que ter pelo menos ${rdetails[1]} caracteres`
                            }
                         break;
                         case `email`:
                                if(((input.length >=1) &&
                                (input.length >=3) &&
                                (input.search("@")==-1) &&
                                (input.search("@")==-1) &&
                                (input.search(" ")==-1) &&
                                (input.search(" ")==-1) &&
                                (input.search(".")!=-1) &&
                                (domiinputnio.indexOf(".") >=1)&&
                                (input.lastIndexOf(".") < input.length - 1)))
                                {
                                    return `E-mail inválido!`
                                }
                            
                         break
                    }
                }
            }
            return true;
       },
       showError(input, error)
       {
        input.style.borderColor = "#FF0000";

        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
       },
       clearErrors:()=> 
       {
           let inputs = form.querySelectorAll('input')
           for(let i=0; i < inputs.length;i++)
           {
               inputs[i].style = '';
           }
           let errorElements = document.querySelectorAll('.error');
           for (let i = 0; i < errorElements.length; i++)
           {
               errorElements[i].remove();
           }
       }
};

let form = document.querySelector(".b7validator");
form.addEventListener('submit', b7validator.handlersubmit);
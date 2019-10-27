var section = document.querySelector('section');

function req(){
	nroFacts = parseFloat(document.getElementById('nroFacts').value);
	if(( nroFacts % 1 != 0) || (nroFacts < 1 || nroFacts > 15)){
		alert("O número de fatos deve ser um número inteiro entre 1 e 15");
		return;
	}			
	section.innerHTML = "<br>";
	var requestURL = 'https://cat-fact.herokuapp.com/facts/random?amount=' + nroFacts;
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	
	request.onload = function() {
		var botao = document.getElementById('botao');			
		botao.textContent = "Aguarde...";
		botao.disabled = true;
		
		var catFacts = request.response;			
		populateFacts(catFacts);
		
		botao.textContent = "Obter lista de fatos!";
		botao.disabled = false;
	}

	function populateFacts(facts){		
		var myTable = document.createElement('table');
		myTable.setAttribute("class", "table table-striped table-responsive-md");
		myTable.setAttribute("id", "demo-table");
		
		var myTHead = document.createElement('thead');
		var myTBody = document.createElement('tbody');
		var myTh1 = document.createElement('th');
					
		myTh1.textContent = "Fatos";				
		myTHead.appendChild(myTh1);
		myTable.appendChild(myTHead);
		myTable.appendChild(myTBody);
						
		for(var i = 0; i < facts.length; i++){
			if ((facts[i].text) && (!!facts[i].text)){
				var myTr = document.createElement('tr');
				myTr.setAttribute("id","tr"+i);
				var myTd1 = document.createElement('td');
				myTd1.textContent = facts[i].text;					
				myTr.appendChild(myTd1);					
				myTBody.appendChild(myTr);				
			}
		}
		
		myTable.appendChild(myTBody);
		section.appendChild(myTable);				
	}		
}		

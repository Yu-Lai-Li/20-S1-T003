let script = document.createElement('script');
script.src = "https://eng1003.monash/api/v1/planes/?callback=processPlaneData";
document.body.appendChild(script);

//need help cant access any of this data
function processPlaneData()
{
console.log(airplanes[0].id);
}

//Search Function got it from w3schools
	function search()
{
	let input = document.getElementById("search");
	let filter = input.value.toUpperCase();
	let table = document.getElementById("myTable");
	let tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++)
	{
		let td = tr[i].getElementsByTagName("td")[0];
		if (td)
		{
			let txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1)
			{
				tr[i].style.display = "";
			}
			else
			{
				tr[i].style.display = "none";
			}
		}
	}
}
//For the show per page Function
//We need something called Bootstrap Pagings

//29 planes

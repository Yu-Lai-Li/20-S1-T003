let script = document.createElement('script');
script.src = "https://eng1003.monash/api/v1/planes/?callback=processPlaneData";
document.body.appendChild(script);

//need help cant access any of this data
function processPlaneData(object)
{
	let outArea = document.getElementById("tableTen");
	let output = ""
	object.airplanes[0].id

	output +=
	`<table id="myTable" align="center">
		<script src = "https://www.w3schools.com/lib/w3.js"></script>
		<tr>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(1)')" style="cursor:pointer">Airline</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(2)')" style="cursor:pointer">ID</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(3)')" style="cursor:pointer">Registration</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(4)')" style="cursor:pointer">Type</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(5)')" style="cursor:pointer">Location</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(6)')" style="cursor:pointer">Range</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(7)')" style="cursor:pointer">Average Speed</th>
			<th onclick="w3.sortHTML('#myTable', '.item', 'td:nth-child(8)')" style="cursor:pointer">Status</th>
		</tr>`

		for (i=0; i<object.airplanes.length; i++)
		{
			output +=
			`<tr class="item">
				<td>${object.airplanes[i].airline}</td>
				<td>${object.airplanes[i].id}</td>
				<td>${object.airplanes[i].registration}</td>
				<td>${object.airplanes[i].type}</td>
				<td>${object.airplanes[i].location}</td>
				<td>${object.airplanes[i].range}</td>
				<td>${object.airplanes[i].avgSpeed}</td>
				<td>${object.airplanes[i].status}</td>
			</tr>`;
		}
		console.log(output)
		outArea.innerHTML = output;
}

//need to make my own search Function
//need to make my own table 
	function search()
{
	let input = document.getElementById("search");
	let filter = input.value.toUpperCase();
	let table = document.getElementById("myTable");
	let tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++)
	{
		let td = tr[i].getElementsByTagName("td")[0] ;
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

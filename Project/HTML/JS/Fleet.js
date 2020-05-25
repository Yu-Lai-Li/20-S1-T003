let processPlaneData =
	{
		"airplanes": [
		   {
			  "id":1,
			  "registration":"VH-TAI",
			  "location":"ADL",
			  "range":17395,
			  "avgSpeed":512,
			  "type":"777-200LR",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":2,
			  "registration":"VH-MGS",
			  "location":"MEL",
			  "range":17395,
			  "avgSpeed":512,
			  "type":"777-200LR",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":3,
			  "registration":"VH-LSO",
			  "location":"SYD",
			  "range":14200,
			  "avgSpeed":488,
			  "type":"787-800",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":4,
			  "registration":"VH-VHI",
			  "location":"AVV",
			  "range":15000,
			  "avgSpeed":570,
			  "type":"747-800",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":5,
			  "registration":"VH-LAT",
			  "location":"CNS",
			  "range":14200,
			  "avgSpeed":488,
			  "type":"787-800",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":6,
			  "registration":"VH-IOA",
			  "location":"PER",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":7,
			  "registration":"VH-KCS",
			  "location":"OOL",
			  "range":15400,
			  "avgSpeed":566,
			  "type":"A380-800",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":8,
			  "registration":"VH-GRI",
			  "location":"ASP",
			  "range":11750,
			  "avgSpeed":470,
			  "type":"A330-300",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":9,
			  "registration":"VH-UJL",
			  "location":"MEL",
			  "range":11750,
			  "avgSpeed":470,
			  "type":"A330-300",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":10,
			  "registration":"VH-ZAX",
			  "location":"SYD",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"Qantas"
		   },
		   {
			  "id":11,
			  "registration":"N49265",
			  "location":"LAX",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":12,
			  "registration":"N723Y",
			  "location":"LAX",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":13,
			  "registration":"N649TL",
			  "location":"JFK",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":14,
			  "registration":"N781SG",
			  "location":"JFK",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":15,
			  "registration":"N969XD",
			  "location":"DCA",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":16,
			  "registration":"N743YS",
			  "location":"TPL",
			  "range":11750,
			  "avgSpeed":470,
			  "type":"A330-300",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":17,
			  "registration":"N692SR",
			  "location":"GYY",
			  "range":14200,
			  "avgSpeed":488,
			  "type":"787-800",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":18,
			  "registration":"N921BW",
			  "location":"SEA",
			  "range":17395,
			  "avgSpeed":512,
			  "type":"777-200LR",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":19,
			  "registration":"N843QY",
			  "location":"TUS",
			  "range":15000,
			  "avgSpeed":570,
			  "type":"747-800",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":20,
			  "registration":"N387SK",
			  "location":"IAD",
			  "range":14200,
			  "avgSpeed":488,
			  "type":"787-800",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":21,
			  "registration":"N59PK",
			  "location":"ALB",
			  "range":14200,
			  "avgSpeed":488,
			  "type":"787-800",
			  "status":"available",
			  "airline":"American Airlines"
		   },
		   {
			  "id":22,
			  "registration":"9M-HBP",
			  "location":"KUL",
			  "range":15000,
			  "avgSpeed":570,
			  "type":"747-800",
			  "status":"available",
			  "airline":"Malaysian Airlines"
		   },
		   {
			  "id":23,
			  "registration":"9M-HJY",
			  "location":"PEN",
			  "range":17395,
			  "avgSpeed":512,
			  "type":"777-200LR",
			  "status":"available",
			  "airline":"Malaysian Airlines"
		   },
		   {
			  "id":24,
			  "registration":"9M-JDE",
			  "location":"LGK",
			  "range":17395,
			  "avgSpeed":512,
			  "type":"777-200LR",
			  "status":"available",
			  "airline":"Malaysian Airlines"
		   },
		   {
			  "id":25,
			  "registration":"G-BUU",
			  "location":"LHR",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"British Airways"
		   },
		   {
			  "id":26,
			  "registration":"G-SGB",
			  "location":"LGW",
			  "range":15400,
			  "avgSpeed":566,
			  "type":"A380-800",
			  "status":"available",
			  "airline":"British Airways"
		   },
		   {
			  "id":27,
			  "registration":"G-EAG",
			  "location":"NWI",
			  "range":5600,
			  "avgSpeed":474,
			  "type":"F900C",
			  "status":"available",
			  "airline":"British Airways"
		   },
		   {
			  "id":28,
			  "registration":"G-HES",
			  "location":"GVA",
			  "range":17395,
			  "avgSpeed":512,
			  "type":"777-200LR",
			  "status":"available",
			  "airline":"British Airways"
		   },
		   {
			  "id":29,
			  "registration":"G-XWN",
			  "location":"FRA",
			  "range":15400,
			  "avgSpeed":566,
			  "type":"A380-800",
			  "status":"available",
			  "airline":"British Airways"
		   }
		]
	};

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
console.log(processPlaneData.airplanes.length);
//29 planes

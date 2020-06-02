//Web service request
let script = document.createElement('script');
script.src = "https://eng1003.monash/api/v1/planes/?callback=processPlaneData";
document.body.appendChild(script);

//Save to local storage
function processPlaneData(object)
{
	const	PLANE_DATA_KEY = "planeKey"
	let planeString = JSON.stringify(object);
	localStorage.setItem("planeKey",planeString);
}
//Retrieve from local storage
/*	WASNT WORKING
	let planeStringLocal = localStorage.getItem("planeKey");
	let planeData = JSON.parse(planeStringLocal);4
	console.log(planeData.airplanes[0].id);
*/

//PLanes Class not sure what to do here
class Plane
{
	constructor(id,reg,loc,range,speed,type,status,airline)
	{
		this._id = id;
		this._reg = reg;
		this._loc = loc;
		this._range = range;
		this._speed = speed;
		this._type = type;
		this._status = status;
		this._airline = airline;
	}
	get id()
	{
		return this._id;
	}
	get reg()
	{
		return this._reg;
	}
	get loc()
	{
		return this._loc;
	}
	get range()
	{
		return this._range;
	}
	get speed()
	{
		return this._speed;
	}
	get type()
	{
		return this._type;
	}
	get status()
	{
		return this._status;
	}
	get airline()
	{
		return this._airline;
	}
	set id(newId)
	{
		this._id = newId;
	}
	set loc(newLoc)
	{
		this._loc = newLoc;
	}
	set range(newRange)
	{
		this._range = newRange;
	}
	set speed(newSpeed)
	{
		this._speed = newSpeed;
	}
	set type(newType)
	{
		this.type = newType;
	}
	set status(newStatus)
	{
		this._status = newStatus;
	}
	set airline(newAirline)
	{
		this._airline = newAirline;
	}
}

class PlaneList
{
	constructor()
	{
		this._planeList = [];
	}

	get planeList()
	{
		return this._planeList;
	}
	get numberOfPlanes()
	{
		return this._planeList.length;
	}

	addPlane(plane)
	{
		this._planeList.push(plane);
	}
}

let SkyPlanes = new PlaneList();
function definePlanesInClass()
{
	let planeStringLocal = localStorage.getItem("planeKey");
	let planeData = JSON.parse(planeStringLocal);4
	console.log(planeData.airplanes[0].id);
	for (let i=0; i<planeData.airplanes.length; i++)
	{
		let plane = new Plane (
			planeData.airplanes[i].id,
			planeData.airplanes[i].registration,
			planeData.airplanes[i].location,
			planeData.airplanes[i].range,
			planeData.airplanes[i].avgSpeed,
			planeData.airplanes[i].type,
			planeData.airplanes[i].status,
			planeData.airplanes[i].airline
		);

		SkyPlanes.addPlane(plane);
	}
	console.log(SkyPlanes.planeList)
}
definePlanesInClass()




/* function addPlanes()
{
	let planeStringLocal = localStorage.getItem("planeKey");
	let planeData = JSON.parse(planeStringLocal);
	console.log(planeData.airplanes[0].id);
	for (let i=0; i<planeData.airplanes.length; i++)
	{
		SkyPlanes.addPlane(planeData.airplanes[i]);
	}
	console.log(SkyPlanes.planeList);
	console.log(SkyPlanes.planeList[0].type);
	console.log(SkyPlanes.planeList[4].avgSpeed);
}
addPlanes()
*/

//Table
function docTable()
{
	let output = "";
	let tableRef= document.getElementById("fleetSection");
	output +=
	`
	<table class="mdl-data-table mdl-js-data-table" id = "fleetTable">
		<thead>
			<tr>
				<th class="mdl-data-table__cell--non-numeric" id ="tableAir" onclick="sortTableByAirline()">Airline</th>
				<th class="mdl-data-table__cell" id="tableID" onclick="sortTableById()">ID</th>
				<th class="mdl-data-table__cell--non-numeric" id="tableReg" onclick="sortTableByRegistration()">Registration</th>
				<th class="mdl-data-table__cell--non-numeric" id="tableType" onclick="sortTableByType()" >Type</th>
				<th class="mdl-data-table__cell--non-numeric" id="tableLoc" onclick="sortTableByLocation()">Location</th>
				<th class="mdl-data-table__cell" id="tableRange" onclick= "sortTableByRange()">Range</th>
				<th class="mdl-data-table__cell" id="tableSpeed" onclick="sortTableByAvgSpeed()">Average Speed</th>
				<th class="mdl-data-table__cell--non-numeric" id="tableStatus" onclick="sortTableByStatus">Status</th>
			</tr>
		</thead>
		<tbody>
	`;
	for (let i=0;i<SkyPlanes.planeList.length;i++)
	{
		output +=
		`
		<tr>
			<td class="mdl-data-table__cell--non-numeric">${SkyPlanes.planeList[i].airline}</th>
			<td class="mdl-data-table__cell">${SkyPlanes.planeList[i].id}</th>
			<td class="mdl-data-table__cell--non-numeric">${SkyPlanes.planeList[i].reg}</td>
			<td class="mdl-data-table__cell--non-numeric">${SkyPlanes.planeList[i].type}</td>
			<td class="mdl-data-table__cell--non-numeric">${SkyPlanes.planeList[i].loc}</td>
			<td class="mdl-data-table__cell">${SkyPlanes.planeList[i].range}</th>
			<td class="mdl-data-table__cell">${SkyPlanes.planeList[i].speed}</th>
			<td class="mdl-data-table__cell--non-numeric">${SkyPlanes.planeList[i].status.toUpperCase()}</td>
		</tr>
		`;
	}
	output+= `
		</tbody>
	</table>`;
	console.log(output);
	tableRef.innerHTML = output;

}

docTable();

	//need to make my own table
function removeTable()
{
	let fleetTableRef = document.getElementById("fleetTable");
	fleetTableRef.parentNode.removeChild(fleetTableRef);
}


function sortArrayById(a,b)
{
	if(a.id < b.id)
	{
		return -1;
	}
	if (a.id > b.id)
	{
		return 1;
	}
	return 0
}

function sortArrayByRegistration(a,b)
{
	if(a.registration < b.registration)
	{
		return -1;
	}
	if (a.registration > b.registration)
	{
		return 1;
	}
	return 0
}

function sortArrayByLocation(a,b)
{
	if(a.location < b.location)
	{
		return -1;
	}
	if (a.location > b.location)
	{
		return 1;
	}
	return 0
}

function sortArrayByRange(a,b)
{
	if(a.range < b.range)
	{
		return -1;
	}
	if (a.range > b.range)
	{
		return 1;
	}
	return 0
}

function sortArrayByAvgSpeed(a,b)
{
	if(a.avgSpeed < b.avgSpeed)
	{
		return -1;
	}
	if (a.avgSpeed > b.avgSpeed)
	{
		return 1;
	}
	return 0
}

function sortArrayByType(a,b)
{
	if(a.type < b.type)
	{
		return -1;
	}
	if (a.type > b.type)
	{
		return 1;
	}
	return 0
}

function sortArrayByStatus(a,b)
{
	if(a.status < b.status)
	{
		return -1;
	}
	if (a.status > b.status)
	{
		return 1;
	}
	return 0
}

function sortArrayByAirline(a,b)
{
	if(a.airline < b.airline)
	{
		return -1;
	}
	if (a.airline > b.airline)
	{
		return 1;
	}
	return 0
}

function sortTableById()
{
	SkyPlanes.planeList.sort(sortArrayById);
	removeTable();
	docTable();
}

function sortTableByRegistration()
{
	SkyPlanes.planeList.sort(sortArrayByRegistration);
	removeTable();
	docTable();
}

function sortTableByLocation()
{
	SkyPlanes.planeList.sort(sortArrayByLocation);
	removeTable();
	docTable();
}

function sortTableByRange()
{
	SkyPlanes.planeList.sort(sortArrayByRange);
	removeTable();
	docTable();
}

function sortTableByType()
{
	SkyPlanes.planeList.sort(sortArrayByType);
	removeTable();
	docTable();
}

function sortTableByAvgSpeed()
{
	SkyPlanes.planeList.sort(sortArrayByAvgSpeed);
	removeTable();
	docTable();
}

function sortTableByStatus()
{
	SkyPlanes.planeList.sort(sortArrayByStatus);
	removeTable();
	docTable();
}

function sortTableByAirline()
{
	SkyPlanes.planeList.sort(sortArrayByAirline);
	removeTable();
	docTable();
}

document.getElementById("tableAir").addEventListener('click', sortTableByAirline());
document.getElementById("tableID").addEventListener('click',sortTableById());
document.getElementById("tableReg").addEventListener('click',sortTableByRegistration());
document.getElementById("tableType").addEventListener('click',sortTableByType());
document.getElementById("tableLoc").addEventListener('click',sortTableByLocation());
document.getElementById("tableRange").addEventListener('click',sortTableByRange());
document.getElementById("tableSpeed").addEventListener('click',sortTableByAvgSpeed());
document.getElementById("tableStatus").addEventListener('click',sortTableByStatus());

function sortBySelect()
{
		let sortRef = document.getElementById("sortSelect");
		let sortSelectValue = sortRef.value;
			if (sortSelectValue =="airline")
			{
				sortTableByAirline();
			}
			else if (sortSelectValue == "id")
			{
				sortTableById();
			}
			else if (sortSelectValue == "registration")
			{
				sortTableByRegistration();
			}
			else if (sortSelectValue == "type")
			{
				sortTableByType();
			}
			else if (sortSelectValue == "location")
			{
				sortTableByLocation();
			}
			else if (sortSelectValue == "avgSpeed")
			{
				sortTableByAvgSpeed();
			}
			else if (sortSelectValue =="status")
			{
				sortTableByStatus();
			}
}

document.getElementById("sortSelect").addEventListener('change',sortBySelect());
sortTableById();

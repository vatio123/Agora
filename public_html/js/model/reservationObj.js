/* @reservationObj()
 * @author: Irene Blanco Fabregat	
 * @date: 02/02/2015
 * @description: Object review
 * @Attributes:
 * 		id: id for the reservation
		name: first name for the reservation
		surname: last name for the reservation
		firstAddress;
		secondAddress;
		city;
		state;
		postalCode;
		numOfAdults;
		numOfChildren;
		phone;
		email;
		roomPreference;
		checkInDate;
		checkOutDate;
		checkInTime;
		checkOutTime;
		specialInstructions;
 * @methods:
 * 		construct
 * 		set's and get's foor each attribute
 * 		toString(): transforms an object to well formated string with the attributes
 * 
*/

function reservationObj ()
{
	//Attributes declaration
	this.id;
	this.name;
	this.surname;
	this.firstAddress;
	this.secondAddress;
	this.city;
	this.state;
	this.postalCode;
	this.numOfAdults;
	this.numOfChildren;
	this.phone;
	this.email;
	this.roomPreference;
	this.checkInDate;
	this.checkOutDate;
	this.checkInTime;
	this.checkOutTime;
	this.specialRequests = new Array();
	this.specialInstructions;

		
	
	//Methods declaration
	this.construct = function (id,name,surname,firstAddress,secondAddress, city, state, postalCode, numOfAdults, numOfChildren, phone, email, roomPreference, checkInDate, checkOutDate, checkInTime, checkOutTime, specialRequests, specialInstructions)
	{
		this.setId(id);
		this.setName(name);
		this.setSurname(surname);
		this.setFirstAddress(firstAddress);
		this.setSecondAddress(secondAddress);
		this.setCity(city);
		this.setState(state);
		this.setPostalCode(postalCode);
		this.setNumOfAdults(numOfAdults);
		this.setNumOfChildren(numOfChildren);
		this.setPhone(phone);
		this.setEmail(email);
		this.setRoomPreference(roomPreference);
		this.setCheckInDate(checkInDate);
		this.setCheckOutDate(checkOutDate);
		this.setCheckInTime(checkInTime);
		this.setCheckOutTime(checkOutTime);
		this.setSpecialRequests(specialRequests);
		this.setSpecialInstructions(specialInstructions);

	}
	
	this.setId = function (id){this.id=id;}
	this.setName = function (name){this.name=name;}
	this.setSurname = function (surname){this.surname=surname;}
	this.setFirstAddress = function (firstAddress){this.firstAddress=firstAddress;}
	this.setSecondAddress = function (secondAddress){this.secondAddress=secondAddress;}
	this.setCity = function (city){this.city=city;}
	this.setState = function (state){this.state=state;}
	this.setPostalCode = function (postalCode){this.postalCode=postalCode;}
	this.setNumOfAdults = function (numOfAdults){this.numOfAdults=numOfAdults;}
	this.setNumOfChildren = function (numOfChildren){this.numOfChildren=numOfChildren;}
	this.setPhone = function (phone){this.phone=phone;}
	this.setEmail = function (email){this.email=email;}
	this.setRoomPreference = function (roomPreference){this.roomPreference=roomPreference;}
	this.setCheckInDate = function (checkInDate){this.checkInDate=checkInDate;}
	this.setCheckOutDate = function (checkOutDate){this.checkOutDate=checkOutDate;}
	this.setCheckInTime = function (checkInTime){this.checkInTime=checkInTime;}
	this.setCheckOutTime = function (checkOutTime){this.checkOutTime=checkOutTime;}
	this.setSpecialRequests = function (specialRequests){this.specialRequests=specialRequests;}
	this.setSpecialInstructions = function (specialInstructions){this.specialInstructions=specialInstructions;}

	
	this.getId = function () {return this.id;}
	this.getName = function () {return this.name;}
	this.getSurname = function () {return this.surname;}
	this.getFirstAddress = function () {return this.firstAddress;}
	this.getSecondAddress = function () {return this.secondAddress;}
	this.getCity = function () {return this.city;}
	this.getState = function () {return this.state;}
	this.getPostalCode = function () {return this.postalCode;}
	this.getNumOfAdults = function () {return this.numOfAdults;}
	this.getNumOfChildren = function () {return this.numOfChildren;}
	this.getPhone = function () {return this.phone;}
	this.getEmail = function () {return this.email;}
	this.getRoomPreference = function () {return this.roomPreference;}
	this.getCheckInDate = function () {return this.checkInDate;}
	this.getCheckOutDate = function () {return this.checkOutDate;}
	this.getCheckInTime = function () {return this.checkInTime;}
	this.getCheckOutTime = function () {return this.checkOutTime;}
	this.getSpecialRequests = function () {return this.specialRequests;}
	this.getSpecialInstructions = function () {return this.specialInstructions;}
	
	this.validate = function ()
	{
		var errors = new Array();
		
		try
		{
			if(this.getName().length == 0 || this.getName().match(/^[a-zA-Z]+$/)==null)
			{
				errors.push("Name must be informed and contain only letters");
			}
		}
		catch(e) {
			errors.push("Name must be informed and contain only letters");
		}
		
		try
		{
			if(this.getSurname().length == 0)
			{
				errors.push("Surname must be informed and contain only letters");
			}
		}
		catch(e) {
			errors.push("Surname must be informed and contain only letters");
		}
		
		return errors;
	}
	
	this.toString = function (){
		var reservationString ="RESERVATION - ID="+this.getId()+" FIRST NAME="+this.getName()+" LAST NAME="+this.getSurname();
		reservationString +=" FIRST ADDRESS="+this.getFirstAddress()+" SECOND ADDRESS="+this.getSecondAddress()+" CITY="+this.getCity();
		reservationString +=" STATE="+this.getState()+" POSTAL CODE="+this.getPostalCode()+" ADULTS="+this.getNumOfAdults();
		reservationString +=" CHILDREN="+this.getNumOfChildren()+" PHONE="+this.getPhone()+" EMAIL="+this.getEmail();
		reservationString +=" ROOM PREF="+this.getRoomPreference()+" CHECK IN DATE="+this.getCheckInDate()+" CHECK OUT DATE="+this.getCheckOutDate();
		reservationString +=" CHECK IN TIME="+this.getCheckInTime()+" CHECK OUT TIME="+this.getCheckOutTime()+" SPECIAL REQ="+this.getSpecialRequests()+" SPECIAL INS="+this.getSpecialInstructions();
		return reservationString;		
	}
}

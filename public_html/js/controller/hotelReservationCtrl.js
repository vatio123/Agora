// jQuery code
$(document).ready(function () {

});

//Angular code
(function (){
	angular.module('hotelbApp').controller('hotelReservation', ['$scope', '$window', function($scope, $window) {
		//Properties
		this.reservation = new reservationObj();

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);

		var dayAfterTomorrow = new Date();
		dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

		//Scope variables
		$scope.today = new Date();
		$scope.showAction;
		$scope.validCheckInDate = true;
		$scope.validCheckOutDate = true;
		$scope.specialRequests=["Breakfast in the room", "Dinner on the roof ", "Romantic visit of the city"];
		$scope.checkInTime = ["00:00", "01:00","02:00"];
		$scope.checkOutTime = ["00:00", "01:00","02:00"];


		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		$scope.dateOptions = {
			dateDisabled: disabled,
			formatYear: 'yyyy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		};

		$scope.checkInDate = {
			opened: false
		};

		$scope.checkOutDate = {
			opened: false
		};
		$scope.openCheckInDate = function() {
			$scope.checkInDate.opened = true;
		};

		$scope.openCheckOutDate = function() {
			$scope.checkOutDate.opened = true;
		};

		this.reservation.construct(0,"Dee","Dee","Dee","Dee", "Dee", "Dee", 12345, 1, 0, 933333333, "r@rc.om", "standard", tomorrow, dayAfterTomorrow, $scope.checkInTime[0], $scope.checkOutTime[0], [], "", 50)

		this.validateDates = function ()
		{
			//cehckning data AAAA-MM-DD
			$scope.validCheckInDate=true;
			$scope.validCheckOutDate=true;

			var currentDate = new Date();
			if(this.reservation.getCheckInDate() < currentDate && $scope.validCheckInDate)
			{
				//$("#checkInDate").removeClass("ng-valid").addClass("ng-invalid");
				$scope.validCheckInDate=false;
				console.log("1: "+$scope.validCheckInDate);
			}

			if(this.reservation.getCheckOutDate() <= currentDate && $scope.validCheckOutDate)
			{
				//$("#checkOutDate").removeClass("ng-valid").addClass("ng-invalid");
				$scope.validCheckOutDate=false;
				console.log("2: "+$scope.validCheckOutDate);
			}

			if(this.reservation.getCheckOutDate() <= this.reservation.getCheckInDate() && $scope.validCheckInDate && $scope.validCheckOutDate)
			{
				$("#checkInDate").removeClass("ng-valid").addClass("ng-invalid");
				$("#checkOutDate").removeClass("ng-valid").addClass("ng-invalid");
				$scope.validCheckInDate=false;
				$scope.validCheckOutDate=false;
				console.log("3: "+$scope.validCheckOutDate);
			}


			if($scope.validCheckInDate && $scope.validCheckOutDate)
			{
				$("#checkInDate").removeClass("ng-invalid").addClass("ng-valid");
				$("#checkOutDate").removeClass("ng-invalid").addClass("ng-valid");

				var dayBetween = calculateNumberDays(this.reservation.getCheckInDate(), this.reservation.getCheckOutDate());

				this.reservation.setTotalPrice(dayBetween*50);
			}
		}

		this.specialReqMng = function (indexChecked)
		{
			if($("#specialReq"+indexChecked).is(":checked"))
			{
				this.reservation.addSpecialRequests($scope.specialRequests[indexChecked]);
			}
			else
			{
				this.reservation.removeSpecialRequests($scope.specialRequests[indexChecked]);
			}
		}

		this.insertReservation = function ()
		{
			console.log(this.reservation);

			if(this.reservation.validate().length==0) {
				alert(this.reservation.toString());
				this.reservation = new reservationObj();
				$scope.reservationManagement.$setPristine();
				$scope.$parent.showAction=0;
			}
			else {showErrors(this.reservation.validate());}
		}

	}]);

	angular.module('hotelbApp').directive("hotelReservationForm", function (){
    return {
      restrict: 'E',
      templateUrl:"view/templates/hotel-reservation-form.html",
      controller:function(){

      },
      controllerAs: 'hotelReservationForm'
    };
  });
})();


//Own code
function disabled(data) {
	var date = data.date,
	mode = data.mode;
	return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
}

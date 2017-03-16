//Angular code
(function (){
	angular.module('videoclubApp').controller("userController", ['$http','$scope', '$window', '$cookies','accessService', 'userConnected',function ($http, $scope, $window, $cookies, accessService, userConnected){

		//scope variables
		if(userConnected.user != undefined)
		{
			$scope.user = userConnected.user;
		}
		else {
			$scope.user = new UserObj();
		}

		$scope.userOption=0;

		$scope.passwordValid = true;
		$scope.nickValid = true;

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		$scope.dateOptions = {
			dateDisabled: "",
			formatYear: 'yyyy',
			maxDate: new Date(),
			minDate: "",
			startingDay: 1
		};

		$scope.birthDate = {
			opened: false
		};

		$scope.openBirthDate = function() {
			$scope.birthDate.opened = true;
		};


		this.userManagement = function ()
		{
			switch ($scope.userOption)
			{
				//User entry: index.html
				case 1:
				var imageFile = $("#imageUser")[0].files[0];

				var imagesArrayToSend = new FormData();
				imagesArrayToSend.append('images[]', imageFile);
				//imagesArrayToSend['images[]']

				$http({
					method: 'POST',
					url: 'php/controllers/MainController.php?controllerType=2&action=10010&jsonData=' + $scope.user.getNick(),
					headers: {'Content-Type': undefined},
					data: imagesArrayToSend,
					transformRequest: function (data, headersGetterFunction) {
						return data;
					}
				}).success(function (outPutData) {
					if (outPutData[0] === true) {
						//File uploaded
						$scope.user.setImage(outPutData[1][0]);
						$scope.user.setActive(1);


						$scope.user = angular.copy($scope.user);

						var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 0, action: 10010, jsonData: JSON.stringify($scope.user)});

						promise.then(function (outPutData) {
							if (outPutData[0] === true)
							{
								$scope.userOption=0;
								$scope.userManagement.$setPristine();
								$scope.user.setId(outPutData[1][0].id);
								$scope.user.setEntryDate(outPutData[1][0].entryDate);
								$scope.user.setDropOutDate(outPutData[1][0].dropOutDate);

								sessionStorage.setItem("connectedUser", JSON.stringify($scope.user));
								window.open("mainWindow.html", "_self");

							} else
							{

								if (angular.isArray(outPutData[1]))
								{
									showErrors(outPutData[1]);
								} else {
									alert("There has been an error in the server, try later");
								}
							}
						});

					} else
					{

						if (angular.isArray(outPutData[1]))
						{
							showErrors(outPutData[1]);
						} else {
							alert("There has been an error in the server, try later");
						}
					}
				});
				break;
				//user modification: mainWindow.html
				case 2:
				if ($("#imageUserMod")[0].files.length > 0)
				{
					//user wants to modify the picture
					filesManagement("imageUserMod", $http, $scope, accessService);
				}
				else
				{
					$scope.user = angular.copy($scope.user);
					var usersArray = [];
					usersArray.push($scope.user);

					var promise = accessService.getData("php/controllers/MainController.php", true, "GET", {controllerType: 0, action: 10020, jsonData: JSON.stringify(usersArray)});

					promise.then(function (outPutData) {
						if (outPutData[0] === true)
						{
							$scope.userOption = 0;


							sessionStorage.setItem("connectedUser", JSON.stringify($scope.user));
							alert("User modified correctly");
							window.location.reload();

						} else
						{

							if (angular.isArray(outPutData[1]))
							{
								showErrors(outPutData[1]);
							} else {
								alert("There has been an error in the server, try later");
							}
						}
					});
				}
				break;
				default:
				console.log("user action not correcte: "+$scope.userOption);
				break;
			}
		}


		this.connection = function ()
		{
			//copy
			$scope.user = angular.copy($scope.user);

			//Server conenction to verify user's data
			var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType:0, action:10000 ,jsonData: JSON.stringify($scope.user)});

			promise.then(function (outPutData) {
				if(outPutData[0]=== true)
				{
					//We get users data
					// In outPutData[1] we have an array of only one position
					// outPutData[1][0] is a pseudo object
					var user = new UserObj();

					user.construct(outPutData[1][0].id, outPutData[1][0].name, outPutData[1][0].surname1, outPutData[1][0].nick, outPutData[1][0].password, outPutData[1][0].address, outPutData[1][0].telephone, outPutData[1][0].mail, outPutData[1][0].birthDate, outPutData[1][0].entryDate, outPutData[1][0].dropOutDate, outPutData[1][0].active, outPutData[1][0].image);

					console.log(user);

					$scope.userOption = 0;

					sessionStorage.setItem("connectedUser", JSON.stringify(outPutData[1][0]));

					window.open("mainWindow.html","_self");

				}
				else
				{
					if(angular.isArray(outPutData[1]))
					{
						showErrors(outPutData[1]);
					}
					else {alert("There has been an error in the server, try later");}
				}
			});
		}

		$scope.setFile = function(element) {
			$scope.currentFile = element.files[0];
			var reader = new FileReader();

			reader.onload = function(event) {
				$scope.userImage = event.target.result
				$scope.$apply();
			}

			// when the file is read it triggers the onload event above.
			reader.readAsDataURL(element.files[0]);
		}
	}]);

	angular.module('videoclubApp').directive("userDataManagement", function (){
		return {
			restrict: 'E',
			templateUrl:"view/templates/user-data-management.html",
			controller:function(){

			},
			controllerAs: 'userDataManagement'
		};
	});

})();


//Own code
function filesManagement(fileName, http, scope, accessService)
{
	//Delete file
	var deleteOK = true;
	var imageFile = $("#"+fileName)[0].files[0];
	var fileName = imageFile.name;
	var fileNewExtension = fileName.substring(fileName.lastIndexOf('.') + 1);

	var fileOldExtension = scope.user.getImage().split(".")[1];

	if (fileNewExtension !== fileOldExtension)
	{
		var arrayNameFiles = [];
		arrayNameFiles.push(scope.user.getImage());

		var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 10020, jsonData: JSON.stringify(arrayNameFiles)});

		promise.then(function (outPutData) {
			if (outPutData[0] !== true)
			{
				deleteOK = false;

				if (angular.isArray(outPutData[1]))
				{
					showErrors(outPutData[1]);
				} else {
					alert("There has been an error in the server, try later");
				}
			}
		});
	}


	if (deleteOK)
	{
		//Upload file
		var imagesArrayToSend = new FormData();
		imagesArrayToSend.append('images[]', imageFile);
		//imagesArrayToSend['images[]']

		http({
			method: 'POST',
			url: 'php/controllers/MainController.php?controllerType=2&action=10010&jsonData=' + scope.user.getNick(),
			headers: {'Content-Type': undefined},
			data: imagesArrayToSend,
			transformRequest: function (data, headersGetterFunction) {
				return data;
			}
		}).success(function (outPutData) {
			if (outPutData[0] === true) {
				//File uploaded
				scope.user.setImage(outPutData[1][0]);


				scope.user = angular.copy(scope.user);
				var usersArray = [];
				usersArray.push(scope.user);

				var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 0, action: 10020, jsonData: JSON.stringify(usersArray)});

				promise.then(function (outPutData) {
					if (outPutData[0] === true)
					{
						scope.userOption = 0;


						sessionStorage.setItem("connectedUser", JSON.stringify(scope.user));
						alert("User modified correctly");
						window.location.reload();

					} else
					{

						if (angular.isArray(outPutData[1]))
						{
							showErrors(outPutData[1]);
						} else {
							alert("There has been an error in the server, try later");
						}
					}
				});

			} else
			{

				if (angular.isArray(outPutData[1]))
				{
					showErrors(outPutData[1]);
				} else {
					alert("There has been an error in the server, try later");
				}
			}
		});
	}
}

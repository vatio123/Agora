<?php
/**
* toDoClass class
* it controls the hole server part of the application
*/
require_once "ControllerInterface.php";
require_once "../views/FilmViewClass.php";
require_once "../model/FilmTypeClass.php";
require_once "../model/DirectorClass.php";
require_once "../model/FilmClass.php";
require_once "../model/persist/FilmTypeADO.php";
require_once "../model/persist/DirectorADO.php";
require_once "../model/persist/FilmADO.php";


class FilmControllerClass implements ControllerInterface {
	private $action;
	private $jsonData;

	function __construct($action, $jsonData) {
		$this->setAction($action);
		$this->setJsonData($jsonData);
	}

	public function getAction() {
		return $this->action;
	}

	public function getJsonData() {
		return $this->jsonData;
	}

	public function setAction($action) {
		$this->action = $action;
	}
	public function setJsonData($jsonData) {
		$this->jsonData = $jsonData;
	}

	public function doAction()
	{
		switch ( $this->getAction() )
		{
			case 10000:
			$filmView = new FilmViewClass($this->loadInitData());
			break;
			case 10010:
			$filmView = new FilmViewClass($this->insertFilms());
			break;
			case 10020:
			$filmView = new FilmViewClass($this->loadFilms());
			break;
			case 10030:
			$filmView = new FilmViewClass($this->modFilms());
			break;
			default:
			$outPutData = array();
			$errors = array();
			$outPutData[0]=false;
			$errors[]="Sorry, there has been an error. Try later";
			$outPutData[]=$errors;
			$filmView = new FilmViewClass($outPutData);
			error_log("Action not correct in FilmControllerClass, value: ".$this->getAction());
			break;
		}

		return $filmView->getData();
	}

	private function loadInitData()
	{
		$outPutData = array();
		$outPutData[]=true;
		$errors = array();

		$listFilmsType = FilmTypeADO::findAll();
		$listDirectors = DirectorADO::findAll();

		if(count($listFilmsType)==0)
		{
			$outPutData[0]=false;
			$errors[]="No films type found in database";
		}
		else
		{
			$filmTypesArray=array();

			foreach ($listFilmsType as $filmType)
			{
				$filmTypesArray[]=$filmType->getAll();
			}
		}

		if(count($listDirectors)==0)
		{
			$outPutData[0]=false;
			$errors[]="No Directors found in database";
		}
		else
		{
			$directorsArray=array();

			foreach ($listDirectors as $director)
			{
				$directorsArray[]=$director->getAll();
			}
		}

		if($outPutData[0])
		{
			$outPutData[]=$filmTypesArray;
			$outPutData[]=$directorsArray;
		}
		else
		{
			$outPutData[]=$errors;
		}

		return $outPutData;
	}


	private function loadFilms()
	{
		$outPutData = array();
		$outPutData[]=true;
		$errors = array();

		$listFilms = FilmADO::findAll();


		if(count($listFilms)==0)
		{
			$outPutData[0]=false;
			$errors[]="No films found in database";
		}
		else
		{
			$filmsArray=array();

			foreach ($listFilms as $film)
			{
				$filmsArray[]=$film->getAll();
			}
		}


		if($outPutData[0])
		{
			$outPutData[]=$filmsArray;
		}
		else
		{
			$outPutData[]=$errors;
		}

		return $outPutData;
	}

	private function insertFilms () {
		$filmsArray = json_decode(stripslashes($this->getJsonData()));
		$outPutData = array();
		$outPutData[]= true;
		$filmIds = array();

		foreach ($filmsArray as $filmObj) {
			$film = new FilmClass();
			$film->setAll($filmObj->id, $filmObj->idFilmType, $filmObj->idDirector, $filmObj->name, $filmObj->price, $filmObj->image, $filmObj->inSale, $filmObj->rented, $filmObj->reviews);
			$filmIds[] =FilmADO::create($film);

		}

		$outPutData[] = $filmIds;
		return $outPutData;
	}

	private function modFilms () {
		$filmsArray = json_decode(stripslashes($this->getJsonData()));
		$outPutData = array();
		$outPutData[]= true;
		$filmIds = array();

		foreach ($filmsArray as $filmObj) {
			$film = new FilmClass();
			$film->setAll($filmObj->id, $filmObj->idFilmType, $filmObj->idDirector, $filmObj->name, $filmObj->price, $filmObj->image, $filmObj->inSale, $filmObj->rented, $filmObj->reviews);

			$filmIds[] =FilmADO::update($film);

		}


		$outPutData[] = $filmIds;
		return $outPutData;
	}


}
?>

function Answer() {
    //Attributes declaration
    this.idanswer;
    this.nickname;
    this.idquestion;
    this.input;

    //Methods declaration
    this.construct = function (idanswer, nickname, idquestion, input){
        this.setIdanswer(idanswer);
        this.setNickname(nickname);
        this.setIdquestion(idquestion);
        this.setInput(input);
    };

    this.setIdanswer = function (idanswer) {
        this.idanswer = idanswer;
    };
    this.setNickname = function (nickname) {
        this.nickname = nickname;
    };
    this.setIdquestion = function (idquestion) {
        this.idquestion = idquestion;
    };
    this.setInput = function (input) {
        this.input = input;
    };


    this.getIdanswer = function () {
        return this.idanswer;
    };
    this.getNickname = function () {
        return this.nickname;
    };
    this.getIdquestion = function () {
        return this.idquestion;
    };
    this.getInput = function () {
        return this.input;
    };

    /*this.arrayToString = function (arrayReviewObj)
    {
        var reviewString = "";
        $.each(arrayReviewObj, function (index, review) {
            reviewString += "stock number " + (index + 1) + ":" + review.toString() + "\n";
        });
        return reviewString;

    };

    this.toString = function ()
    {
        var reviewString = "REVIEW - ID=" + this.getId() + " RATE=" + this.getRate() + " OPINION=" + this.getOpinion();
        reviewString += " EMAIL=" + this.getEmail();
        return reviewString;
    };*/
} // END Answer class

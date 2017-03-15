function Valoration() {
    //Attributes declaration
    this.idvalorationa;
    this.nickname;
    this.idanswer;
    this.valoration;

    //Methods declaration
    this.construct = function (idvalorationa, nickname, idanswer, valoration){
        this.setIdvalorationa(idvalorationa);
        this.setNickname(nickname);
        this.setIdanswer(idanswer);
        this.setValoration(valoration);
    };

    // Getter and setter
    this.setIdvalorationa = function (idvalorationa) {
        this.idvalorationa = idvalorationa;
    };
    this.setNickname = function (nickname) {
        this.nickname = nickname;
    };
    this.setIdanswer = function (idanswer) {
        this.idanswer = idanswer;
    };
    this.setValoration = function (valoration) {
        this.valoration = valoration;
    };

    this.getIdvalorationa = function () {
        return this.idvalorationa;
    };
    this.getNickname = function () {
        return this.nickname;
    };
    this.getIdanswer = function () {
        return this.idanswer;
    };
    this.getValoration = function () {
        return this.valoration;
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
} // END User class

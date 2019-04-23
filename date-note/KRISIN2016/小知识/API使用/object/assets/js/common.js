if (window.addEventListener) {
    var eleNums = document.querySelectorAll(".num");
    document.getElementById("input").addEventListener("change", function() {
        var value = this.value.trim() * 1;
        if (!value || value < 100 || value > 999) { value = 283; }
        this.value = value;
        this.value.split("").forEach(function(num, index) {
            eleNums[index].className = "num num" + num;
        });
    });
}

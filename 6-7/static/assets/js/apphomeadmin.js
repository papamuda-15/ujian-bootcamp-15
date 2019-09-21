var home=angular.module("homeApp",[]);
home.controller("homeController",function($scope,$http) {

    var id=localStorage.getItem("id_akun");
    if(id ==="")
    {
        swal({
            text:"Silakan Login Dulu !!!",
            icon:"warning"
        });
        setInterval(function()
        {
            window.location.href="index.php";
        },2000)
    }

    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdashboard.php?s=jumlahBarang",
    }).then(function (res) {
        $scope.jumlahbarang=res.data.jumlah;
    });
    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdashboard.php?s=showlogUser",
    }).then(function (res) {
        $scope.data=res.data;
    });

    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdashboard.php?s=jumlahKasir",
    }).then(function (res) {
        $scope.jumlahkasir=res.data.jumlah;
    });

    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdashboard.php?s=jumlahPelanggan",
    }).then(function (res) {
        $scope.jumlahpelanggan=res.data.jumlah;
    });

    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdashboard.php?s=jumlahTransaksi",
    }).then(function (res) {
        $scope.jumlahtransaksi=res.data.jumlah;
    });

    $http({
        method: "POST",
        url: "http://localhost/server%20mgm/controller/Cdashboard.php?s=jumlahLaba",
    }).then(function (res) {
        $scope.jumlahlaba=res.data.jumlah;
    });
});

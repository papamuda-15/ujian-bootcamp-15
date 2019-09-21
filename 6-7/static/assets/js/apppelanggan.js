var kasir=angular.module("kasirApp",[]);
kasir.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{@');
  $interpolateProvider.endSymbol('@}');
});
kasir.controller("kasirController",function($scope,$http){

    var btn=document.getElementById("btn");
    var nama=document.getElementById("nama");
    var alamat=document.getElementById("alamat");
    var nomor=document.getElementById("nomor");
    var username=document.getElementById("username");
    var password=document.getElementById("password");
    var tgl=document.getElementById("tgl");
    var foto;
    var aksi=1;
    var tempid;
    var id=localStorage.getItem("id_akun");
    if(id ==="")
    {
        swal({
            text:"Silakan Login Dulu !!!",
            icon:"warning"
        });
        setInterval(function()
        {
            window.location.href="../../index.php";
        },2000)
    }
    $http({

        method: 'POST',
        url: 'http://localhost:8000/tampilPelanggan/',
    }).then(function(e)
    {
        $scope.pelanggan=e.data;

    });

});
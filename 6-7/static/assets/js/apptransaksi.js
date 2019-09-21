var kasir=angular.module("transaksiApp",['datatables']);
kasir.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{@');
  $interpolateProvider.endSymbol('@}');
});
kasir.controller("transaksiController",function($scope,$http){
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
    $scope.tampilDetailTransaksi=function()
    {
        $http({
            method: "POST",
            url: "http://localhost:8000/tampiltransaksi/",
        }).then(function (res) {
            var total=0;
            $scope.data2=res.data;

            for (var i = 0; i < $scope.data2.length; i++) {
                var product = $scope.data2[i];
                total +=0+product.laba;
                $scope.totalsemua=total;

            }
        });
    }
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.tampilDetailTransaksi();
});
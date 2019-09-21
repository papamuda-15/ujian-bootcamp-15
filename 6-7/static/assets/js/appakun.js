
var kasir = angular.module("akunApp", []);
kasir.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{@');
  $interpolateProvider.endSymbol('@}');
});
kasir.controller("akunController", function($scope, $http) {

    var btn = document.getElementById("btn");
    var nama = document.getElementById("nama");
    var alamat = document.getElementById("alamat");
    var nomor = document.getElementById("nomor");
    var username = document.getElementById("username");
    var tgl = document.getElementById("tanggal");
    var foto;
    var aksi = 1;
    var tempid;
    var pin;

    var id = localStorage.getItem("id_akun");
    if (id === "") {
        swal({
            text: "Silakan Login Dulu !!!",
            icon: "warning"
        });
        setInterval(function() {
            window.location.href = "../../index.php";
        }, 2000)
    }

    $http({
        method: 'POST',
        url: 'http://localhost:8000/showId/',
        data: { id: id }
    }).then(function(e) {
        var obj=e.data[0]
        $scope.nama =obj.nama
        $scope.alamat=obj.alamat
        $scope.username = obj.username
        $scope.tanggal =obj.tgl
        $scope.nomor = obj.nomor
        $scope.image = obj.foto
        $scope.id = obj.id
    });
    $scope.showId = function(id) {

        aksi = 0;
        $http({
            method: 'POST',
            url: 'http://localhost:8000/showId/',
            data: { id: id }
        }).then(function(e) {
            // Store response data
            var obj = e.data[0]
            nama.value = obj.nama;
            alamat.value = obj.alamat
            tgl.value = obj.tgl;
            nomor.value =obj.nomor;
            username.value =obj.username;
            pin = obj.password;
            $scope.foto = obj.foto;
            tempid = obj.id
            foto = obj.foto

        });
    }

    $scope.uploadBerkas = function() {
        fd = new FormData();
        files = document.getElementById('file').files[0];

        fd.append('file', files);

        // AJAX request
        $http({
            method: 'POST',
            url: '../../controller/Ckasir.php?s=uploadFoto',
            data: fd,
            headers: { 'Content-Type': undefined },
        }).then(function successCallback(response) {
            // Store response data
            foto = response.data.name;
            $scope.result = response.data.status;
            $scope.foto = response.data.name;

        });
    }

    document.getElementById("btn-update").addEventListener("click", function() {
        var json = {
            nama: nama.value,
            tgl: tgl.value,
            alamat: alamat.value,
            pin: pin,
            nomor: nomor.value,
            username: username.value,
            foto: foto,
            id: tempid
        }
        $http({

            method: 'POST',
            url: 'http://localhost:8000/update/',
            data: json
        }).then(function(e) {
            var check = e.data.message;
            if (check > 0) {
                swal({
                    text: "Perbarui data berhasil",
                    icon: "success"
                });
                $scope.tampilKasir();
            } else {
                swal({
                    text: "Gagal",
                    icon: "error"
                });
            }
        });
    });

});
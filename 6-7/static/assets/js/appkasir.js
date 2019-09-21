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
    var tgl=document.getElementById("tgl");
    var pin=document.getElementById("pin");
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
    $scope.getPin=function()
    {
        $scope.pin=Math.floor(Math.random() *999999999);
    }
    $http({

        method: 'POST',
        url: 'http://localhost:8000/tampildata/',
           }).then(function(e)
    {
        $scope.kasir=e.data;

    });

    function cleartext()
    {
        nama.value="";
        alamat.value="";
        tgl.value="";
        username.value="";
        pin.value="";
        foto="";
        $scope.foto=foto;
        nomor.value="";
        aksi=1;
    }
    $scope.tampilKasir=function()
    {
        $http({

            method: 'POST',
            url: 'http://localhost:8000/tampildata/',
        }).then(function(e)
        {
            $scope.kasir=e.data;
            cleartext();
        });
    }

    btn.addEventListener("click",function()
    {
        if(aksi >0)
        {
            var json={nama:nama.value,tgl:tgl.value,alamat:alamat.value,pin:pin.value,
                nomor:nomor.value,username:username.value,
                foto:foto}
            $http({

                method: 'POST',
                url: 'http://localhost:8000/tambahKasir/',
                data:json
            }).then(function(e)
            {
                   var check=e.data.message;
                        if(check >0)
                        {
                            swal({
                                text:"Simpan data berhasil",
                                icon:"success"
                            });
                            $scope.tampilKasir();
                        }
                        else
                        {
                            swal({
                                text:"Gagal",
                                icon:"error"
                            });
                        }
                
                  
               
            });
        }
        else
        {
            var json={nama:nama.value,tgl:tgl.value,alamat:alamat.value,pin:pin.value,
                nomor:nomor.value,username:username.value,
                foto:foto,id:tempid}
           $http({

            method: 'POST',
            url: 'http://localhost:8000/update/',
            data: json
        }).then(function(e) {
           
           
                $scope.tampilKasir();
          
            
        });
        }

    });
    $scope.uploadBerkas=function()
    {
        fd = new FormData();
        files = document.getElementById('file').files[0];

        fd.append('file',files);

        // AJAX request
        $http({
            method: 'POST',
            url: 'http://localhost:8000/uploadfoto/',
            data: fd,
            headers: {'Content-Type': undefined},
        }).then(function successCallback(response) {
            // Store response data
            foto = response.data.name;
            $scope.result=response.data.status;
            $scope.foto=response.data.name;

        });
    }

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
    $scope.deleteKasir=function(id)
    {
        swal({
            title: "Apakah anda Yakin Ingin Menghapus Data Ini?",
            text: "Sekali Hapus, Kamu Tidak Akan Bisa Mengembalikannya",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $http({
                        method: 'POST',
                        url: 'http://localhost:8000/hapusKasir/',
                        data:{id:id}
                    }).then(function(e) {

                        var check=e.data.message;
                        if(check >0)
                        {
                            swal({
                                text:"Hapus data berhasil",
                                icon:"success"
                            });
                            $scope.tampilKasir();
                        }
                        else
                        {
                            swal({
                                text:"Gagal",
                                icon:"error"
                            });
                        }

                    });
                } else {
                    swal("Data anda masih aman");
                }
            });
    }
});
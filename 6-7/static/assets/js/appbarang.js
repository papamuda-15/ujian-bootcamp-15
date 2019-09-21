var barang=angular.module("barangApp",[]);
barang.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{@');
  $interpolateProvider.endSymbol('@}');
});
barang.controller("barangController",function($scope,$http){

    var btn=document.getElementById("btn");
    var nama_barang=document.getElementById("nama");
    var nomor_barcode=document.getElementById("nomor_barcode");
    var harga=document.getElementById("harga");
    var stok=document.getElementById("stok");
    var harga_jual=document.getElementById("harga_jual");
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
        url: 'http://localhost:8000/tampilbarang/',
    }).then(function(e)
    {
        $scope.barang=e.data;

    });

    function cleartext()
    {
        nama_barang.value="";
        nomor_barcode.value="";
        harga.value="";
        stok.value="";
        aksi=1;
    }
   $scope.tampilKasir=function()
    {
        $http({

        method: 'POST',
        url: 'http://localhost:8000/tampilbarang/',
        }).then(function(e)
        {
            $scope.barang=e.data;
            cleartext();

        });
    }
    btn.addEventListener("click",function()
    {
        if(aksi >0)
        {
          var json={nama_barang:nama_barang.value,nomor_barcode:nomor_barcode.value,
                    harga:harga.value,stok:stok.value,harga_jual:harga_jual.value};
            $http({

                method: 'POST',
                url: 'http://localhost:8000/tambahBarang/',
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
            var json={nama_barang:nama_barang.value,nomor_barcode:nomor_barcode.value,
                harga:harga.value,stok:stok.value,id:tempid,harga_jual:harga_jual.value};
            $http({

                method: 'POST',
                url: 'http://localhost:8000/updateBarang/',
                data:json
            }).then(function(e)
            {
                var check=e.data.message;
                if(check >0)
                {
                    swal({
                        text:"Perbarui data berhasil",
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

    });

    $scope.showId=function(id)
    {
        aksi=0;
        $http({
             method: 'POST',
             url: 'http://localhost:8000/showBarang/',
            data:{id:id}
        }).then(function(e) {
            nama_barang.value=e.data[0].nama_barang;
            nomor_barcode.value=e.data[0].nomor_barcode;
            harga.value=e.data[0].harga;
            stok.value=e.data[0].stok;
            tempid=e.data[0].id;
            harga_jual.value=e.data[0].harga_jual;
            if(stok.value.length ===0)
            {
                stok.value=0;
            }

        });
    }
    $scope.deleteBarang=function(id)
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
                        url: 'http://localhost:8000/hapusBarang/',
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
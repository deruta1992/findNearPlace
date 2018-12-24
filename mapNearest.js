var map;
var service;
var infowindow;
var pyrmont;

function initialize(ido, keido) {
  pyrmont = new google.maps.LatLng(ido,keido);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 18
  });

  //http://express.heartrails.com/api.html
  let url_eki = "http://express.heartrails.com/api/json?method=getStations&x=" + keido + "&y=" + ido
  /*Station APIのレスポンスについては未定義
  $.ajax({
    url: url_eki,
    dataType: 'json',
    method: "get"
  }).then(function(res){
    console.log(res)
    let url = "https://map.yahooapis.jp/placeinfo/V1/get?lat=" + ido + "&lon=" + keido + "&appid=dj00aiZpPUtaeWtUVW15Z2FmViZzPWNvbnN1bWVyc2VjcmV0Jng9MGU-&output=json";
    console.log(url)
    $.ajax({
      url: url,
      dataType: 'json',
      method: "get"
    }).then(function(res){
      console.log(res)
    }, function(err){
      console.log(err)
    })
  }, function(err){
    console.log(err)
  })

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  */
}

function callback(results, status) {
  //if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    results.forEach(function(element, index){
      let tr_con = document.createElement('tr');
      //施設カテゴリ
      let td_con1 = document.createElement('td');
      td_con1.classList.add('category_cell');
      td_con1.appendChild(document.createTextNode(element.Category));
      //施設名
      let td_con2 = document.createElement('td');
      td_con2.appendChild(document.createTextNode(element.Name));
      /*施設の所在地
      let td_con3 = document.createElement('td');
      td_con3.appendChild(document.createTextNode(element.geometry.location.lat() + ',' + element.geometry.location.lng()));*/
      /*評価
      let td_con5 = document.createElement('td');
      td_con5.appendChild(document.createTextNode(element.rating));*/
      //住所
      let td_con7 = document.createElement('td');
      td_con7.appendChild(document.createTextNode(element.Where));
      //
      tr_con.appendChild(td_con1);
      tr_con.appendChild(td_con2);
      tr_con.appendChild(td_con7);
      //tr_con.appendChild(td_con5);
      document.querySelector('#result > tbody').appendChild(tr_con); 

      /*var marker = new google.maps.Marker({
        position: element.geometry.location,
        map: map,
      });
      */
      infoWindow = new google.maps.InfoWindow({ // 吹き出しの追加
          content: '<div class="fukidasi">' + element.Name + '</div>'
      });
      //marker.addListener('click', function() {
        infoWindow.open(map, marker); // 吹き出しの表示
      //});
    });
    //最後に、現場の位置
     marker = new google.maps.Marker({
      position: pyrmont,
      map: map,
      icon: './pin01.png'
    });
    
  //}
}

window.onload = function(){
  //initialize();
  //URLの?以降の文字を取得する
  var url=location.search.substring(1);
  var str=url.split('&');
  console.log(str)
  var datas = new Array();
  str.forEach(function(element, index){
    var params = element.split('=');
    datas[params[0]] = params[1];
  })
  console.log(datas)
  if(datas.ido){ ido = datas.ido } else { ido = ido = 35.5425 }
  if(datas.keido){ keido = datas.keido } else { keido = keido = 139.3710 }
  document.getElementsByName('ido')[0].value = ido
  document.getElementsByName('keido')[0].value = keido
  initialize(ido, keido)
}

function research(){
  let ido = document.getElementsByName('ido')[0].value;
  let keido = document.getElementsByName('keido')[0].value;
  document.querySelector('#result > tbody').innerHTML = null;
  initialize(ido, keido)
}
/**
 * 取得可能な施設は下記の通り。
 * accounting
airport
amusement_park
aquarium
art_gallery
atm
bakery
bank
bar
beauty_salon
bicycle_store
book_store
bowling_alley
bus_station
cafe
campground
car_dealer
car_rental
car_repair
car_wash
casino
cemetery
church
city_hall
clothing_store
convenience_store
courthouse
dentist
department_store
doctor
electrician
electronics_store
embassy
fire_station
florist
funeral_home
furniture_store
gas_station
gym
hair_care
hardware_store
hindu_temple
home_goods_store
hospital
insurance_agency
jewelry_store
laundry
lawyer
library
liquor_store
local_government_office
locksmith
lodging
meal_delivery
meal_takeaway
mosque
movie_rental
movie_theater
moving_company
museum
night_club
painter
park
parking
pet_store
pharmacy
physiotherapist
plumber
police
post_office
real_estate_agency
restaurant
roofing_contractor
rv_park
school
shoe_store
shopping_mall
spa
stadium
storage
store
subway_station
supermarket
synagogue
taxi_stand
train_station
transit_station
travel_agency
veterinary_care
zoo
*/


// test leaflet map
var map;
var marker;
var imageObject;
var imagePath;
var imageWidth;
var imageHeight;
var dialog;
var L;
var margin=100;
// var segmentsList;
// var curveSegmentsList;
// var stationsList;
// var theoricReflectorsList;
// var realReflectorsList;
// var layoutObject;

var myButtonOptions = {
    'text': 'Localizar AGV',  // string
    'iconUrl': '',  // string
    'onClick': my_button_onClick,  // callback function
    'hideText': true,  // bool
    'maxWidth': 50,  // number
    'doToggle': true,  // bool
    'toggleStatus': false  // bool
}








// map = L.map('map').setView([51.505, -0.09], 13);



function createMap() {

    // Creates various objects from json strings
    // layoutObject = JSON.parse(layout);
    // segmentsList = JSON.parse(segments);
    // stationsList = JSON.parse(stations);
    // theoricReflectorsList = JSON.parse(theoricReflectors);

    // imagePath = 'images' + layoutObject.Background.BackgroundImagePath.replace('.', '');
    // imagePath = "./map.bag_edited1.png";
    imagePath = "./uqm_map_full.png";
    imageObject = new Image();
    imageObject.src = imagePath;
    // document.body.appendChild(imageObject);
    // IMAGE IS LOADED why use this shit?? to confirm that we load the image??? wtf
    imageObject.onload = function () {

        // imageHeight = imageObject.height;
        // imageWidth = imageObject.width;

        // MAP OBEJCT
        map = L.map('map', {
            fullscreenControl: true,
            minZoom: -10,
            maxZoom: 4,
            center: [0, 0],
            // zoom: -2,
            contextmenu: true,
            contextmenuWidth: 140,
            crs: L.CRS.Simple // used to change to euclidean coordinates
        });

        var myButton = new L.Control.Button(myButtonOptions).addTo(map);

        // var southWest = map.unproject([0, imageHeight], map.getMaxZoom());
        // var northEast = map.unproject([imageWidth, 0], map.getMaxZoom());
        // var bounds = new L.LatLngBounds(southWest, northEast);
        // var bounds = [[-26.5,-25/2], [1021.5,1023/2]];
        //

        //ok so we specify coordinates of the image in here where we have an
        // euclidean frame with left down corner y,x position and right top corner with y,x easy fucking peasy
        var bounds = [[-26.5, -25], [1021.5, 1023]]; //set this with the resolution*height or width not manually
        // var bounds = [[0,0], [1000,1000]];
        console.log(bounds[0][0]);
        marginBounds=[[bounds[0][0]-margin, bounds[0][0]-margin],[bounds[1][0]+margin,bounds[1][1]+margin]];
        // bounds = bounds
        //bounds in pixels
        // var southWest = map.unproject([0, imageHeight], map.getMaxZoom());
        // var northEast = map.unproject([imageWidth, 0], map.getMaxZoom());
        // var bounds = new L.LatLngBounds(southWest, northEast);



        // LOAD IMAGE AS MAP
        L.imageOverlay(imagePath, bounds).addTo(map);
        map.fitBounds(bounds);

        // SET PIXEL MODE// This limits our view. We cant go after this limit. like padding
        // set this to another value so you can scroll the map higher or lower than it should
        map.setMaxBounds(marginBounds);
        // map.fitBounds(bounds);

        var sol = L.latLng([145, 175.2]); // position in lat lng of the center to view
        L.marker(sol).addTo(map);
        // map.setView( [70, 1000], 1);
        var zero = L.latLng([0, 0]);
        L.marker(zero).addTo(map);

        var zero = L.latLng([450, 50]); //lat lng = y x
        L.marker(zero).addTo(map);

        var zero = L.latLng([50, 450]);
        L.marker(zero).addTo(map);

        // var zero=L([50,450]);
        // L.marker(zero).addTo(map);

        // map.on('click', function(e) {        
        //     var popLocation= e.latlng;
        //     var popup = L.popup()
        //     .setLatLng(popLocation)
        //     .setContent('oi'+popLocation)
        //     .openOn(map);        
        // });


        // map.on("click", function(e) {
        //     var latlng = e.latlng;
        //     // var pixelPosition = map.latLngToLayerPoint(latlng);
        //     var pixelPosition= map.project(latlng,map.getMaxZoom());
        //     alert("LatLng = " + latlng + "\n Pixel position = " + pixelPosition);
        //   });


// console.log(map.getPixelOrigin());
        marker = L.marker([0, 0]).addTo(map);

    };

}



createMap();





function my_button_onClick() {
    console.log("someone clicked my button");
    // sleep(2000);
    var delay = 500;
    setTimeout(addMarker, delay)
}

function addMarker(e) {
    //var pass = true;
    // Add marker to map at click location; add popup window
    // var newMarker = new L.marker(e.latlng).addTo(map);
    //marker.dragging.enable();
    // marker = new L.marker(e.latlng, {draggable: true}).addTo(map);
    var pass = true;
    var angle;
    map.on('click', function (e) {
        if (!pass) {
            console.log('bye');
            console.log(angle);

            map.off('click');
            map.off('mousemove');
            // map.removeLayer(marker2);
            return;
        }
        console.log("inserted marker");
        marker.setLatLng([e.latlng.lat, e.latlng.lng]);
        // marker2 = new L.marker([marker._latlng.lat, marker._latlng.lng], { rotationAngle: 0 }).addTo(map);
        //marker.L.marker([marker.latlng.lat, marker.latlng.lng], { rotationAngle: 0 }).addTo(map);
        //marker2 = L.marker([marker._latlng]).addTo(map);
        //console.log(marker._latlng.lat)
        //console.log(marker.project._latlng.lat)
        map.on('mousemove', function (ev) {
            angle = Math.atan2(ev.latlng.lng - marker._latlng.lng, ev.latlng.lat - marker._latlng.lat) * (180 / Math.PI);
            console.log("ev lat" + ev.latlng.lat);
            console.log("ev lon" + ev.latlng.lng);
            console.log("marker lat" + marker._latlng.lat)
            console.log("marker long" + marker._latlng.lng)
            //let angle = Math.atan2(e.pageX - marker._latlng.lat, - (e.pageY - marker._latlng.lng)) * (180 / Math.PI);
            //marker2.transform = `rotate(${angle}deg)`;  })
            marker.setRotationAngle(angle);
        });
        pass = false;
    });

}


// Connecting to ROS
// -----------------

// var ros = new ROSLIB.Ros({
//     url: 'ws://192.168.1.100:9090'
// });

// ros.on('connection', function () {
//     console.log('Connected to websocket server.');
// });

// ros.on('error', function (error) {
//     console.log('Error connecting to websocket server: ', error);
// });

// ros.on('close', function () {
//     console.log('Connection to websocket server closed.');
// });

// // Publishing a Topic
// // ------------------

// var send_initialPose = new ROSLIB.Topic({
//     ros: ros,
//     name: '/initialpose',
//     messageType: 'geometry_msgs/PoseWithCovarianceStamped'
// });

// var pose = new ROSLIB.Message({
//     pose: {
//         pose: {
//             position: {
//                 x: 0.0,
//                 y: 0.0,
//                 z: 0.0
//             },
//             orientation: {
//                 x: 0.0,
//                 y: 0.0,
//                 z: 0.0,
//                 w: 1.0
//             }
//         },
//         covariance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     }
// });
// console.log(pose);
// send_initialPose.publish(pose);



// // Subscribing to a Topic
// // ----------------------

// var listener = new ROSLIB.Topic({
//     ros: ros,
//     name: '/initialpose',
//     messageType: 'geometry_msgs/PoseWithCovarianceStamped'
// });

// listener.subscribe(function (message) {
//     console.log(message);
//     listener.unsubscribe();
// });

// //   var listener = new ROSLIB.Topic({
// //     ros : ros,
// //     name : '/odom',
// //     messageType : 'nav_msgs/Odometry'
// //   });

// //   listener.subscribe(function(message) {
// //     console.log('Received message on ' + listener.name + ': ' + message.pose.pose.position.x);
// //     listener.unsubscribe();
// //   });


// //   // Calling a service
// //   // -----------------

// //   var addTwoIntsClient = new ROSLIB.Service({
// //     ros : ros,
// //     name : '/add_two_ints',
// //     serviceType : 'rospy_tutorials/AddTwoInts'
// //   });

// //   var request = new ROSLIB.ServiceRequest({
// //     a : 1,
// //     b : 2
// //   });

// //   addTwoIntsClient.callService(request, function(result) {
// //     console.log('Result for service call on '
// //       + addTwoIntsClient.name
// //       + ': '
// //       + result.sum);
// //   });

// //   // Getting and setting a param value
// //   // ---------------------------------

// //   ros.getParams(function(params) {
// //     console.log(params);
// //   });

// //   var maxVelX = new ROSLIB.Param({
// //     ros : ros,
// //     name : 'max_vel_y'
// //   });

// //   maxVelX.set(0.8);
// //   maxVelX.get(function(value) {
// //     console.log('MAX VAL: ' + value);
// //   });
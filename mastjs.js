// test leaflet map
var map;
var marker;
var imageObject;
var imagePath;
var imageWidth;
var imageHeight;
var dialog;
var L;

// var segmentsList;
// var curveSegmentsList;
// var stationsList;
// var theoricReflectorsList;
// var realReflectorsList;
// var layoutObject;

// var myButtonOptions = {
//     'text': 'Localizar AGV',  // string
//     'iconUrl': '',  // string
//     'onClick': my_button_onClick,  // callback function
//     'hideText': true,  // bool
//     'maxWidth': 50,  // number
//     'doToggle': true,  // bool
//     'toggleStatus': false  // bool
// }


// function createMap(segments, stations, theoricReflectors, layout) {

//     // Creates various objects from json strings
//     // layoutObject = JSON.parse(layout);
//     // segmentsList = JSON.parse(segments);
//     // stationsList = JSON.parse(stations);
//     // theoricReflectorsList = JSON.parse(theoricReflectors);

//     // imagePath = 'images' + layoutObject.Background.BackgroundImagePath.replace('.', '');
//     imagePath = "./map.bag_edited1.png";
//     imageObject = new Image();
//     imageObject.src = imagePath;

//     // IMAGE IS LOADED
//     imageObject.onload = function () {

//         imageHeight = imageObject.height;
//         imageWidth = imageObject.width;

//         // MAP OBEJCT
//         map = L.map('map', {
//             fullscreenControl: true,
//             minZoom: 1,
//             maxZoom: 4,
//             center: [0, 0],
//             zoom: 1,
//             contextmenu: true,
//             contextmenuWidth: 140,
//             crs: L.CRS.Simple
//         });


//         var myButton = new L.Control.Button(myButtonOptions).addTo(map);


//         segmentsList.forEach(function myFunction(item, index) {
//             // IS LINE
//             if (item.Vectors.length == 0) {
//                 addSegment(item.StartVector.X, item.StartVector.Y, item.EndVector.X, item.EndVector.Y, item.Id, false);
//             }
//             // IS CURVE
//             else {
//                 DotNet.invokeMethodAsync('Artisteril.AGV.WebInterface', 'GetCurveSegments',
//                     item.StartVector.X, item.StartVector.Y, item.EndVector.X, item.EndVector.Y, item.Vectors[0].X, item.Vectors[0].Y)
//                     .then(data => {
//                         curveSegmentsList = JSON.parse(data);
//                         //console.log(data);
//                         curveSegmentsList.forEach(function myFunction(item2, index) {
//                             addSegment(item2.StartVector.X, item2.StartVector.Y, item2.EndVector.X, item2.EndVector.Y, item.Id, true);
//                         });
//                     });
//             }
//         });

//         stationsList.forEach(function myFunction(item, index) {
//             addStation(item.Vector.X, item.Vector.Y, item.Id);
//         });

//         theoricReflectorsList.forEach(function myFunction(item, index) {
//             addTheoricReflector(item.Vector.X, item.Vector.Y, item.Id);
//         });

//         // BOUNDS IN PIXELS
//         var southWest = map.unproject([0, imageHeight], map.getMaxZoom());
//         var northEast = map.unproject([imageWidth, 0], map.getMaxZoom());
//         var bounds = new L.LatLngBounds(southWest, northEast);

//         // LOAD IMAGE AS MAP
//         L.imageOverlay(imagePath, bounds).addTo(map);

//         // SET PIXEL MODE
//         map.setMaxBounds(bounds);

//         // ADD DEFAULT MARKER
//        //marker = L.marker([30, 30.5], {
//        //     rotationAngle: 0
//         //}).addTo(map);
//         marker = L.marker(map.unproject([imageWidth, imageHeight], map.getMaxZoom()), {draggable: false, rotationAngle:0 }).addTo(map);

//         // ADD DEFAULT DIALOG
//         //dialog = L.control.dialog({
//         //    size: [200, 100],
//         //    position: "topleft"
//         //}).setContent("<p>IPosition Not valid!</p>").addTo(map);

//         //L.control.mousePosition().addTo(map);

//         if (useRos) {
//             RosConnect();
//         }


//     };

// }
// map = L.map('map').setView([51.505, -0.09], 13);
function createMap() {

    // Creates various objects from json strings
    // layoutObject = JSON.parse(layout);
    // segmentsList = JSON.parse(segments);
    // stationsList = JSON.parse(stations);
    // theoricReflectorsList = JSON.parse(theoricReflectors);

    // imagePath = 'images' + layoutObject.Background.BackgroundImagePath.replace('.', '');
    // imagePath = "./map.bag_edited1.png";
    imagePath="./uqm_map_full.png";
    imageObject = new Image();
    imageObject.src = imagePath;
    // document.body.appendChild(imageObject);
    // IMAGE IS LOADED
    imageObject.onload = function () {

        imageHeight = imageObject.height;
        imageWidth = imageObject.width;

        // MAP OBEJCT
        map = L.map('map', {
            fullscreenControl: true,
            minZoom: 0,
            maxZoom: 20,
            center: [0, 0],
            zoom: 0,
            contextmenu: true,
            contextmenuWidth: 140,
            crs: L.CRS.Simple // used to change to euclidean coordinates
        });


    // var southWest = map.unproject([0, imageHeight], map.getMaxZoom());
    // var northEast = map.unproject([imageWidth, 0], map.getMaxZoom());
    // var bounds = new L.LatLngBounds(southWest, northEast);

    var bounds = [[-26.5,-25], [1021.5,1023]];
    // var bounds = [[0,0], [1000,1000]];
    // LOAD IMAGE AS MAP
    L.imageOverlay(imagePath, bounds).addTo(map);
    // map.fitBounds(bounds);

    // SET PIXEL MODE// This limits our view. We cant go after this limit. like padding
    map.setMaxBounds(bounds);

    var sol = L.latLng([ 145, 175.2 ]);
    L.marker(sol).addTo(map);
    map.setView( [70, 1000], 1);

    // marker = L.marker(map.unproject([imageWidth, imageHeight], map.getMaxZoom())).addTo(map);

};

}

createMap();


// function my_button_onClick() {
//     console.log("someone clicked my button");
//     // sleep(2000);
//     var delay = 500;
//     setTimeout(addMarker, delay)
// }

// function addMarker(e) {
//     //var pass = true;
//     // Add marker to map at click location; add popup window
//     // var newMarker = new L.marker(e.latlng).addTo(map);
//     //marker.dragging.enable();
//     // marker = new L.marker(e.latlng, {draggable: true}).addTo(map);
//     var pass = true;
//     var angle;
//     map.on('click', function (e) {
//         if (!pass) {
//             console.log('bye');
//             console.log(angle);

//             map.off('click');
//             map.off('mousemove');
//             map.removeLayer(marker2);
//             return;
//         }
//         console.log("inserted marker");
//         marker.setLatLng([e.latlng.lat, e.latlng.lng]);
//         // marker2 = new L.marker([marker._latlng.lat, marker._latlng.lng], { rotationAngle: 0 }).addTo(map);
//         //marker.L.marker([marker.latlng.lat, marker.latlng.lng], { rotationAngle: 0 }).addTo(map);
//         //marker2 = L.marker([marker._latlng]).addTo(map);
//         //console.log(marker._latlng.lat)
//         //console.log(marker.project._latlng.lat)
//         map.on('mousemove', function (ev) {
//             angle = Math.atan2(ev.latlng.lng - marker._latlng.lng, ev.latlng.lat - marker._latlng.lat) * (180 / Math.PI);
//             console.log("ev lat" + ev.latlng.lat);
//             console.log("ev lon" + ev.latlng.lng);
//             console.log("marker lat" + marker._latlng.lat)
//             console.log("marker long" + marker._latlng.lng)
//             //let angle = Math.atan2(e.pageX - marker._latlng.lat, - (e.pageY - marker._latlng.lng)) * (180 / Math.PI);
//             //marker2.transform = `rotate(${angle}deg)`;  })
//             marker.setRotationAngle(angle);
//         });
//         pass = false;
//     });

// }


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
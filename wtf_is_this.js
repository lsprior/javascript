function createMap(segments, stations, theoricReflectors, layout) {

    // Creates various objects from json strings
    // layoutObject = JSON.parse(layout);
    // segmentsList = JSON.parse(segments);
    // stationsList = JSON.parse(stations);
    // theoricReflectorsList = JSON.parse(theoricReflectors);

    // imagePath = 'images' + layoutObject.Background.BackgroundImagePath.replace('.', '');
    imagePath = "./map.bag_edited1.png";
    imageObject = new Image();
    imageObject.src = imagePath;

    // IMAGE IS LOADED
    imageObject.onload = function () {

        imageHeight = imageObject.height;
        imageWidth = imageObject.width;

        // MAP OBEJCT
        map = L.map('map', {
            fullscreenControl: true,
            minZoom: 1,
            maxZoom: 4,
            center: [0, 0],
            zoom: 1,
            contextmenu: true,
            contextmenuWidth: 140,
            crs: L.CRS.Simple
        });


        var myButton = new L.Control.Button(myButtonOptions).addTo(map);


        segmentsList.forEach(function myFunction(item, index) {
            // IS LINE
            if (item.Vectors.length == 0) {
                addSegment(item.StartVector.X, item.StartVector.Y, item.EndVector.X, item.EndVector.Y, item.Id, false);
            }
            // IS CURVE
            else {
                DotNet.invokeMethodAsync('Artisteril.AGV.WebInterface', 'GetCurveSegments',
                    item.StartVector.X, item.StartVector.Y, item.EndVector.X, item.EndVector.Y, item.Vectors[0].X, item.Vectors[0].Y)
                    .then(data => {
                        curveSegmentsList = JSON.parse(data);
                        //console.log(data);
                        curveSegmentsList.forEach(function myFunction(item2, index) {
                            addSegment(item2.StartVector.X, item2.StartVector.Y, item2.EndVector.X, item2.EndVector.Y, item.Id, true);
                        });
                    });
            }
        });

        stationsList.forEach(function myFunction(item, index) {
            addStation(item.Vector.X, item.Vector.Y, item.Id);
        });

        theoricReflectorsList.forEach(function myFunction(item, index) {
            addTheoricReflector(item.Vector.X, item.Vector.Y, item.Id);
        });

        // BOUNDS IN PIXELS
        var southWest = map.unproject([0, imageHeight], map.getMaxZoom());
        var northEast = map.unproject([imageWidth, 0], map.getMaxZoom());
        var bounds = new L.LatLngBounds(southWest, northEast);

        // LOAD IMAGE AS MAP
        L.imageOverlay(imagePath, bounds).addTo(map);

        // SET PIXEL MODE
        map.setMaxBounds(bounds);

        // ADD DEFAULT MARKER
       //marker = L.marker([30, 30.5], {
       //     rotationAngle: 0
        //}).addTo(map);
        marker = L.marker(map.unproject([imageWidth, imageHeight], map.getMaxZoom()), {draggable: false, rotationAngle:0 }).addTo(map);

        // ADD DEFAULT DIALOG
        //dialog = L.control.dialog({
        //    size: [200, 100],
        //    position: "topleft"
        //}).setContent("<p>IPosition Not valid!</p>").addTo(map);

        //L.control.mousePosition().addTo(map);

        if (useRos) {
            RosConnect();
        }


    };

}
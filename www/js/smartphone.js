// Initialize variables
var linearSpeed = 0.0; // Initial linear speed
var angularSpeed = 0.0; // Initial angular speed
var maxDistance = 100; // Set maximum distance of joystick path related to speed
var maxLinear = 0.0; // Initial max linear speed
var maxAngular = 0.0; // Initial max angular speed
var status = ''; // Declare status
var connectStatus = false; // Initial connect variable
// Initialize publishers and subscribers
var velocityPublisher; // Sends Twist messages
var goalPublisher; // Sends simple goal messages
var cancelPublisher; // Sends cancel message
var qrGoalPublisher; // Sends QR tag command (simulate tag detection)
var imageSubscriber; // Subscribes and receives stream of images
var batterySubscriber; // Receives battery kobuki base status
var diagnosticsSubscriber; // Receives diagnostics messages and status from robot
var commandSubscriber; // Receives visp auto tracker detected QR code tag (live reader)
const defaultImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/4gKwSUNDX1BST0ZJTEUAAQEAAAKgbGNtcwQwAABtbnRyUkdCIFhZWiAH4wALAAwAFwABAA1hY3NwTVNGVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1kZXNjAAABIAAAAEBjcHJ0AAABYAAAADZ3dHB0AAABmAAAABRjaGFkAAABrAAAACxyWFlaAAAB2AAAABRiWFlaAAAB7AAAABRnWFlaAAACAAAAABRyVFJDAAACFAAAACBnVFJDAAACFAAAACBiVFJDAAACFAAAACBjaHJtAAACNAAAACRkbW5kAAACWAAAACRkbWRkAAACfAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACQAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAaAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAEcASQBNAFBtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEL/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAH0ArwDAREAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8QAFBABAAAAAAAAAAAAAAAAAAAAwP/aAAgBAQABBQItR//EABQRAQAAAAAAAAAAAAAAAAAAAMD/2gAIAQMBAT8BLUf/xAAUEQEAAAAAAAAAAAAAAAAAAADA/9oACAECAQE/AS1H/8QAFBABAAAAAAAAAAAAAAAAAAAAwP/aAAgBAQAGPwItR//EABQQAQAAAAAAAAAAAAAAAAAAAMD/2gAIAQEAAT8hLUf/2gAMAwEAAgADAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAMD/2gAIAQMBAT8QLUf/xAAUEQEAAAAAAAAAAAAAAAAAAADA/9oACAECAQE/EC1H/8QAFBABAAAAAAAAAAAAAAAAAAAAwP/aAAgBAQABPxAtR//Z';
// Init app
init();
// Initialize settings
function init() {
    $('#connectModal').modal('show');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}
// Modify settings
function setSettings() {
    var robotURL = 'ws://' + document.getElementById('robotIP').value + ':9090';
    maxLinear = document.getElementById('maxLinearSpeed').value;
    maxAngular = document.getElementById('maxAngularSpeed').value;
    var fpvValue = document.getElementById('fpv').checked;
    $('#connectModal').modal('hide');
    connect(robotURL, fpvValue);
}
// Initiallize Joysticks
var joystickL = nipplejs.create({
    zone: document.getElementById('left'),
    mode: 'static',
    position: { left: '30%', top: '50%' },
    color: 'gray',
    size: 200,
    lockY: true
});
var joystickR = nipplejs.create({
    zone: document.getElementById('right'),
    mode: 'static',
    position: { left: '70%', top: '50%' },
    color: 'gray',
    size: 200,
    lockX: true
});
// Set on Start, on Move and on End functionalities for Left Joystick
self.joystickL.on('start', function (_event, _nipple) {
    // Enable a function that runs continuously and send Twist messages
    timer = setInterval(function () {
        if (connectStatus)
            moveRobot(linearSpeed, angularSpeed);
    }, 25);  // Send every 25 milliseconds every message
});
self.joystickL.on('move', function (_event, nipple) {
    linearSpeed = Math.sin(nipple.angle.radian) * maxLinear * nipple.distance / maxDistance;
});
self.joystickL.on('end', function () {
    // Stop timer if it is enabled and set linear speed to zero to stop robot
    if (timer) {
        clearInterval(timer);
    }
    linearSpeed = 0.0;
    if (connectStatus)
        moveRobot(linearSpeed, angularSpeed);
});
// Set on Start, on Move and on End functionalities for Right Joystick
self.joystickR.on('start', function (_event, _nipple) {
    // Enable a function that runs continuously and send Twist messages
    timer = setInterval(function () {
        if (connectStatus)
            moveRobot(linearSpeed, angularSpeed);
    }, 25);  // Send every 25 milliseconds every message
});
self.joystickR.on('move', function (_event, nipple) {
    angularSpeed = -Math.cos(nipple.angle.radian) * maxAngular * nipple.distance / maxDistance;
});
self.joystickR.on('end', function () {
    // Stop timer if it is enabled and set angular speed to zero to stop robot
    if (timer) {
        clearInterval(timer);
    }
    angularSpeed = 0.0;
    if (connectStatus)
        moveRobot(linearSpeed, angularSpeed);
});
// Connect to robot
function connect(robotURL, fpvValue) {
    var ROS;
    // ROS connection states
    ROS = new ROSLIB.Ros({
        url: robotURL
    });
    ROS.on('connection', function () {
        document.getElementById('status').innerHTML = 'Network: connected';
        document.getElementById('signal').className = 'fas fa-signal';
        connectStatus = true;
    });
    ROS.on('error', function (_error) {
        document.getElementById('status').innerHTML = 'Network: error';
        document.getElementById('signal').className = 'fas fa-exclamation-circle';
        document.getElementById('robotMessage').src = defaultImage;
        connectStatus = false;
    });
    ROS.on('close', function () {
        document.getElementById('status').innerHTML = 'Network: closed';
        document.getElementById('signal').className = 'fas fa-ban';
        document.getElementById('robotMessage').src = defaultImage;
        connectStatus = false;
    });
    // Publish to /cmd_vel_mux/input/safety_controller to move robot
    velocityPublisher = new ROSLIB.Topic({
        ros: ROS,
        name: '/cmd_vel_mux/input/safety_controller',
        messageType: 'geometry_msgs/Twist'
    });
    // Publish to /move_base_simple/goal to set new goal
    goalPublisher = new ROSLIB.Topic({
        ros: ROS,
        name: '/move_base_simple/goal',
        messageType: 'geometry_msgs/PoseStamped'
    });
    // Publish to /move_base/cancel to cancel all goals
    cancelPublisher = new ROSLIB.Topic({
        ros: ROS,
        name: '/move_base/cancel',
        messageType: 'actionlib_msgs'
    });
    // Publish to /joystick/command to send QR goal
    qrGoalPublisher = new ROSLIB.Topic({
        ros: ROS,
        name: '/joystick/command',
        messageType: 'std_msgs/String'
    });
    // Subscribe to /rgb/image_raw/compressed to receive compressed images
    imageSubscriber = new ROSLIB.Topic({
        ros: ROS,
        name: '/camera/rgb/image_raw/compressed',
        messageType: 'sensor_msgs/CompressedImage'
    });
    // Receive base64 messages and add data:image/jpeg;base64, to show data
    imageSubscriber.subscribe(function (msg) {
        if (fpvValue)
            document.getElementById('robotMessage').src = 'data:image/jpeg;base64,' + msg.data;
    });
    // Subscribe to /event to receive battery status
    batterySubscriber = new ROSLIB.Topic({
        ros: ROS,
        name: '/diagnostics',
        messageType: 'diagnostic_msgs/DiagnosticArray'
    });
    // Receive battery status
    batterySubscriber.subscribe(function (msg) {
        if ((typeof (msg.status[0]) !== 'undefined') && (msg.status[0].hardware_id === 'Kobuki')) {
            var batteryLevel = msg.status[0].values[1].value;
            if (batteryLevel >= 60.0) {
                document.getElementById('battery').className = 'fas fa-battery-full';
            } else if (batteryLevel <= 25.0) {
                document.getElementById('battery').className = 'fas fa-battery-empty';
            } else {
                document.getElementById('battery').className = 'fas fa-battery-half';
            }
        }
    });
    // Subscribe to /visp_auto_tracker/code_message to receive commands
    commandSubscriber = new ROSLIB.Topic({
        ros: ROS,
        name: '/visp_auto_tracker/code_message',
        messageType: 'std_msgs/String'
    });
    // Receive command
    commandSubscriber.subscribe(function (msg) {
        if (msg.data !== '') {
            document.getElementById('status').innerHTML = 'Command: ' + msg.data;
        }
    });
    // Subscribe to /joystick/diagnostics to receive diagnostics
    diagnosticsSubscriber = new ROSLIB.Topic({
        ros: ROS,
        name: '/joystick/diagnostics',
        messageType: 'std_msgs/String'
    });
    // Receive command
    diagnosticsSubscriber.subscribe(function (msg) {
        document.getElementById('status').innerHTML = 'Goal: ' + msg.data;
    });
}
// Publish geometry_msgs/Twist messages to move robot
function moveRobot(linear, angular) {
    var twist = new ROSLIB.Message({
        linear: {
            x: linear,
            y: 0.0,
            z: 0.0
        },
        angular: {
            x: 0.0,
            y: 0.0,
            z: angular
        }
    });
    if (connectStatus)
        velocityPublisher.publish(twist);
}
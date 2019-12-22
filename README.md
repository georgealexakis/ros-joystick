# ROS Joystick

ROS Joystick is a Hybrid Application, that enables the remote controling and monitoring of a robot that is running ROS. (This implementation has tested only with ROS Kinetic version) 

## Getting Started

### Download the Source of Project

Download repository code from:

``` $ git clone https://github.com/georgealexakis/ros-joystick.git (master branch) ```

Or get a copy of the source from:

``` $ git clone https://github.com/georgealexakis/ros-joystick.git (master branch) ```

### Install Necessary Package

To connect ROS Joystick to ROS robot, it is necessary to install rosbridge. Run the command below:

``` $ sudo apt-get install ros-<version>-rosbridge-server ```

## Executing

Connect to the same network with the ROS implemented robot. Run rosbridge with:

``` $ roslaunch rosbridge_server rosbridge_websocket.launch ```

Copy the ip that rosbridge provides via websockects and then run index.html to start the web application to web browser.

Or

Use the Android Application in [/build] folder, that runs on Android Devices. You can also build the application for different devices.

Or

Build the Application for different devices using Apache Cordova or Adode Phonegab the files in [/hybrid] folder.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



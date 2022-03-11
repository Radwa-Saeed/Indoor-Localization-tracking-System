# Indoor-Localization-tracking-System
Design and implementation of a WiFi tracking module where a bracelet can be attached to an object and the user can localize and track the current location of the object in real time through either a mobile application or a website

<p align="center"><img src="./Results/00.png" alt="Original" width="500"/></p>

-   The features for this project are going to be the RSSIs (Received signal strength indication) of the known WiFi networks. If a network is out of range, it will have an RSSI equal to 0.

## 1. Data Acquisition

- Before actually recording the sample data to train our classifier, we need to do some preliminary work. This is because not all networks will be visible all the time: we have to work, however, with a fixed number of features.

-   First of all we need to enumerate all the networks we will encounter during the inference process.

     To begin, we take a "reconnaissance tour" of the locations we want to predict and log all the networks we detect. Load the following sketch and take note of all the networks that appear on the Serial monitor.
<p align="center"><img src="./Results/01.png" alt="Original" width="500"/></p>

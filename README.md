# Kaliningrad

Template Based Database Modeler Leveraging Power of Multi-Model Data Stores.

![](https://github.com/SquashConsulting/kaliningrad/blob/master/kaliningrad.gif)

Since our software heavily relies on Graph databases we, at first, decided to name it Königsberg as a reference to a famous graph theory problem called ["The Travelling Salesman Problem"](https://en.wikipedia.org/wiki/Travelling_salesman_problem). However having an umlaut(ö) in the repository name caused some problems; thus, we chose _Kaliningrad_ which is the name that was chosen for Königsberg after the World War 2.

# Project Structure

Kalinigrad is consisted of a couple of layers.

## Frontend

The frontend client is a React JS application that loads, visualizes, and produces a Kaliningrad graph structure.

## Parser

The parser takes a Kaliningrad graph and generates an AST or some sort of instruction set(TBD) for the Project Generator.

## Project Generator

The generator uses the parsed instructions to build a project with a Reverse Proxy + Data Access Layer Microservices + Multi-Model Data Store

## Reverse Proxy

This Proxy is used for BLL <-> DAL communication

## Template Microservice

Typescript powered DAL microservice macro-programmable template to be used during the Project Generation stage.

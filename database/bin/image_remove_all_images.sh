#!/bin/bash

# 大いなる力には大いなる責任が伴う
# docker rmi -f $(docker images -q)
docker rmi $(docker images -q)
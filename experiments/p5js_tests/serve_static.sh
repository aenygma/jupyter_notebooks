#!/usr/bin/env bash 

##
# start|stop|restart python SimpleHTTPServer
#
# TODO:
#	  use shell Function for DRY
# USAGE:
#   ./manage_simplehttpserver.sh start|stop|restart
#
# VIEW:
#   http://localhost:8000

port=$2
case $1 in
	"start" )
        echo "start python SimpleHTTPServer"
		python -m SimpleHTTPServer $2 > /tmp/nohup.out &
		;;
	"stop" )
        echo "restart python SimpleHTTPServer"
        pid=$(ps aux | grep -i "[p]ython -m SimpleHTTPServer" | grep -v grep | awk '{print $2}');
        echo "Found pid: ${pid}. Killing..."
        kill "${pid}" > /dev/null;
		;;
	"restart" )
		echo "restart python SimpleHTTPServer"
        pid=$(ps aux | grep -i "[p]ython -m SimpleHTTPServer" | grep -v grep | awk '{print $2}');
        echo "Found pid: ${pid}. Killing..."
        kill "${pid}";
		python -m SimpleHTTPServer $2 > /tmp/nohup.out &
		;;
	*)
		echo "need start|stop|restart"
		exit 1
esac

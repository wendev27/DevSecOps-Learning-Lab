hyoukasterben@hyoukasterben-Legion-5-15IMH6:~/Desktop/DevSecOps-Learning-Lab/labs/databases/redis-lab$ docker exec -it redis-lab redis-cli

# Strings and Counter

127.0.0.1:6379> SET user "wendev27"
OK
127.0.0.1:6379> GET user
"wendev27"
127.0.0.1:6379> SET visitors 100
OK
127.0.0.1:6379> INCR visitors
(integer) 101
127.0.0.1:6379> GET visitors
"101"

# Lists

127.0.0.1:6379> SET flood_alert "warning"
OK
127.0.0.1:6379> EXPIRE flood_alert 60
(integer) 1
127.0.0.1:6379> TTL flood_alert
(integer) 55
127.0.0.1:6379> GET flood_alert
(nil)
127.0.0.1:6379> LPUSH notifications "Flood warning"
(integer) 1
127.0.0.1:6379> LPUSH notifications "Evacuation alert"
(integer) 2
127.0.0.1:6379> LPUSH notifications "Relief arrived"
(integer) 3
127.0.0.1:6379> LRANGE notifications 0 -1

1. "Relief arrived"
2. "Evacuation alert"
3. "Flood warning"

# Sets

127.0.0.1:6379> SADD barangays "Barangay 1"
(integer) 1
127.0.0.1:6379> SADD barangays "Barangay 2"
(integer) 1
127.0.0.1:6379> SADD barangays "Barangay 2"
(integer) 0
127.0.0.1:6379> SMEMBERS barangays

1. "Barangay 1"
2. "Barangay 2"

# Hashes

127.0.0.1:6379> HSET user:1 username "wendev27"
(integer) 1
127.0.0.1:6379> HSET user:1 email "wendev@example.com"
(integer) 1
127.0.0.1:6379> HSET user:1 role "admin"
(integer) 1
127.0.0.1:6379> HGETALL user:1

1. "username"
2. "wendev27"
3. "email"
4. "wendev@example.com"
5. "role"
6. "admin"

# Output

Redis Type Command What you stored
String SET user "wendev27" One simple value
Counter INCR visitors A number that can increase
List LPUSH notifications ... Ordered items
Set SADD barangays ... Unique values
Hash HSET user:1 ... An object-like structure

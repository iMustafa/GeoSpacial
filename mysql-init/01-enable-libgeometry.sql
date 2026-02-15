-- The user requested to install this specific plugin with this specific SONAME.
-- Note: 'mysql_no_login' is typically for preventing login, and 'libgeometry.so' is not a standard plugin library name in official MySQL builds.
-- This might fail if the library does not exist in the container.
INSTALL PLUGIN mysql_no_login SONAME 'libgeometry.so';

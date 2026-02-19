CREATE DATABASE vexma_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE vexma_db;
ALTER TABLE actividad RENAME COLUMN id_vehiculo TO vehiculo;
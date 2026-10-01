/**
 * AmritaNav - Multi-Floor Campus Graph & Router
 * Walkable corridors & stairs across all 4 floors
 */
const CAMPUS_DATA_PLACEHOLDER = {
  "scaleMetersPerPixel": 0.15,
  "avgWalkingSpeedMps": 1.25,
  "stairPenaltyMeters": 15.0,
  "stairColumns": [
    {
      "id": "STAIR-NW",
      "name": "North-West Stairs (Near Reception / CAD)",
      "pos": [
        540,
        690
      ]
    },
    {
      "id": "STAIR-SW",
      "name": "South-West Stairs (Near Acharya / Conf)",
      "pos": [
        571,
        941
      ]
    },
    {
      "id": "STAIR-N",
      "name": "North Wing Stairs (Near Physics / Chem)",
      "pos": [
        890,
        325
      ]
    },
    {
      "id": "STAIR-CS",
      "name": "Central-South Stairs (Near Courtyard)",
      "pos": [
        926,
        1005
      ]
    },
    {
      "id": "STAIR-CTR",
      "name": "Central Spine Stairs (Main Axis)",
      "pos": [
        988,
        765
      ]
    },
    {
      "id": "STAIR-NE",
      "name": "North-East Stairs (Engineering / Staff)",
      "pos": [
        1365,
        484
      ]
    },
    {
      "id": "STAIR-E",
      "name": "East Wing Stairs (Near Computer Labs)",
      "pos": [
        1661,
        690
      ]
    }
  ],
  "floors": {
    "ground": {
      "floor": "ground",
      "floorIdx": 0,
      "title": "Ground Floor",
      "nodes": [
        [
          472.0,
          527.0
        ],
        [
          473.0,
          537.0
        ],
        [
          474.0,
          546.0
        ],
        [
          476.0,
          564.0
        ],
        [
          480.0,
          600.0
        ],
        [
          488.0,
          673.0
        ],
        [
          492.0,
          710.0
        ],
        [
          494.0,
          728.0
        ],
        [
          494.75,
          734.72
        ],
        [
          496.0,
          746.0
        ],
        [
          504.0,
          818.0
        ],
        [
          512.0,
          891.0
        ],
        [
          512.84,
          898.57
        ],
        [
          513.65,
          905.88
        ],
        [
          516.0,
          927.0
        ],
        [
          518.0,
          945.0
        ],
        [
          520.0,
          963.0
        ],
        [
          524.0,
          1000.0
        ],
        [
          529.0,
          1047.0
        ],
        [
          534.5,
          1094.53
        ],
        [
          535.0,
          1099.0
        ],
        [
          536.0,
          1108.0
        ],
        [
          662.0,
          716.0
        ],
        [
          717.0,
          709.0
        ],
        [
          828.0,
          697.0
        ],
        [
          938.48,
          684.16
        ],
        [
          1120.0,
          663.0
        ],
        [
          1211.0,
          653.0
        ],
        [
          1256.0,
          648.0
        ],
        [
          1301.63,
          642.78
        ],
        [
          1365.0,
          636.0
        ],
        [
          1428.31,
          628.35
        ],
        [
          1519.0,
          618.0
        ],
        [
          1609.14,
          607.75
        ],
        [
          1687.0,
          599.0
        ],
        [
          1765.0,
          590.0
        ],
        [
          1921.12,
          572.2
        ],
        [
          681.0,
          888.0
        ],
        [
          736.0,
          881.0
        ],
        [
          792.0,
          875.0
        ],
        [
          958.0,
          855.0
        ],
        [
          1140.0,
          835.0
        ],
        [
          1231.0,
          825.0
        ],
        [
          1321.0,
          814.0
        ],
        [
          1353.0,
          811.0
        ],
        [
          1385.0,
          807.0
        ],
        [
          1448.0,
          800.0
        ],
        [
          1629.0,
          779.0
        ],
        [
          1707.0,
          770.0
        ],
        [
          1785.0,
          761.0
        ],
        [
          1863.0,
          752.0
        ],
        [
          1941.0,
          743.0
        ],
        [
          917.0,
          495.0
        ],
        [
          948.0,
          770.0
        ],
        [
          969.0,
          952.0
        ],
        [
          975.0,
          1000.0
        ],
        [
          979.55,
          1043.68
        ],
        [
          980.0,
          1048.0
        ],
        [
          1591.94,
          456.72
        ],
        [
          1619.0,
          693.0
        ],
        [
          1640.0,
          876.0
        ],
        [
          1656.0,
          1022.0
        ],
        [
          832.0,
          174.0
        ],
        [
          842.0,
          255.0
        ],
        [
          851.0,
          337.0
        ],
        [
          860.0,
          419.0
        ],
        [
          869.0,
          501.0
        ],
        [
          913.51,
          164.65
        ],
        [
          923.0,
          246.0
        ],
        [
          932.0,
          328.0
        ],
        [
          941.0,
          410.0
        ],
        [
          950.75,
          491.53
        ],
        [
          872.77,
          169.29
        ],
        [
          871.53,
          158.36
        ],
        [
          1210.08,
          459.99
        ],
        [
          1259.0,
          454.0
        ],
        [
          1308.0,
          449.0
        ],
        [
          1357.0,
          443.0
        ],
        [
          1406.8,
          437.57
        ],
        [
          1450.0,
          433.0
        ],
        [
          1493.0,
          428.0
        ],
        [
          1580.0,
          418.0
        ],
        [
          1469.86,
          992.99
        ],
        [
          665.0,
          1082.0
        ],
        [
          731.0,
          1076.0
        ],
        [
          748.0,
          1075.0
        ],
        [
          40.0,
          880.0
        ],
        [
          300.0,
          840.0
        ],
        [
          1587.02,
          417.12
        ],
        [
          1586.0,
          409.0
        ],
        [
          1580.0,
          360.0
        ],
        [
          300.0,
          800.0
        ],
        [
          340.0,
          780.0
        ],
        [
          360.0,
          760.0
        ],
        [
          480.0,
          740.0
        ],
        [
          320.0,
          880.0
        ],
        [
          340.0,
          900.0
        ],
        [
          380.0,
          900.0
        ],
        [
          500.0,
          900.0
        ],
        [
          680.0,
          520.0
        ],
        [
          800.0,
          1060.0
        ],
        [
          855.0,
          1055.0
        ],
        [
          910.0,
          1050.0
        ],
        [
          1020.0,
          1040.0
        ],
        [
          1130.0,
          1030.0
        ],
        [
          1240.0,
          1020.0
        ],
        [
          1282.0,
          1018.0
        ],
        [
          1363.0,
          1010.0
        ],
        [
          1444.0,
          1001.0
        ],
        [
          1525.0,
          992.0
        ],
        [
          1640.0,
          980.0
        ],
        [
          1470.42,
          998.06
        ],
        [
          495.15,
          738.32
        ]
      ],
      "edges": [
        {
          "u": 0,
          "v": 1,
          "dist": 10.05
        },
        {
          "u": 1,
          "v": 2,
          "dist": 9.06
        },
        {
          "u": 2,
          "v": 3,
          "dist": 18.11
        },
        {
          "u": 2,
          "v": 99,
          "dist": 207.63
        },
        {
          "u": 3,
          "v": 4,
          "dist": 36.22
        },
        {
          "u": 4,
          "v": 5,
          "dist": 73.44
        },
        {
          "u": 5,
          "v": 6,
          "dist": 37.22
        },
        {
          "u": 6,
          "v": 7,
          "dist": 18.11
        },
        {
          "u": 7,
          "v": 8,
          "dist": 6.76
        },
        {
          "u": 8,
          "v": 9,
          "dist": 11.35
        },
        {
          "u": 8,
          "v": 22,
          "dist": 168.29
        },
        {
          "u": 9,
          "v": 10,
          "dist": 72.44
        },
        {
          "u": 10,
          "v": 11,
          "dist": 73.44
        },
        {
          "u": 11,
          "v": 12,
          "dist": 7.62
        },
        {
          "u": 12,
          "v": 13,
          "dist": 7.35
        },
        {
          "u": 12,
          "v": 98,
          "dist": 12.92
        },
        {
          "u": 13,
          "v": 14,
          "dist": 21.25
        },
        {
          "u": 13,
          "v": 37,
          "dist": 168.3
        },
        {
          "u": 14,
          "v": 15,
          "dist": 18.11
        },
        {
          "u": 15,
          "v": 16,
          "dist": 18.11
        },
        {
          "u": 16,
          "v": 17,
          "dist": 37.22
        },
        {
          "u": 17,
          "v": 18,
          "dist": 47.27
        },
        {
          "u": 18,
          "v": 19,
          "dist": 47.85
        },
        {
          "u": 19,
          "v": 20,
          "dist": 4.5
        },
        {
          "u": 19,
          "v": 83,
          "dist": 131.1
        },
        {
          "u": 20,
          "v": 21,
          "dist": 9.06
        },
        {
          "u": 22,
          "v": 23,
          "dist": 55.44
        },
        {
          "u": 23,
          "v": 24,
          "dist": 111.65
        },
        {
          "u": 24,
          "v": 25,
          "dist": 111.22
        },
        {
          "u": 25,
          "v": 26,
          "dist": 182.75
        },
        {
          "u": 25,
          "v": 52,
          "dist": 190.38
        },
        {
          "u": 25,
          "v": 53,
          "dist": 86.37
        },
        {
          "u": 26,
          "v": 27,
          "dist": 91.55
        },
        {
          "u": 27,
          "v": 28,
          "dist": 45.28
        },
        {
          "u": 28,
          "v": 29,
          "dist": 45.93
        },
        {
          "u": 29,
          "v": 30,
          "dist": 63.73
        },
        {
          "u": 29,
          "v": 43,
          "dist": 172.31
        },
        {
          "u": 30,
          "v": 31,
          "dist": 63.77
        },
        {
          "u": 31,
          "v": 32,
          "dist": 91.28
        },
        {
          "u": 31,
          "v": 78,
          "dist": 191.99
        },
        {
          "u": 32,
          "v": 33,
          "dist": 90.72
        },
        {
          "u": 33,
          "v": 34,
          "dist": 78.35
        },
        {
          "u": 33,
          "v": 58,
          "dist": 152.01
        },
        {
          "u": 33,
          "v": 59,
          "dist": 85.82
        },
        {
          "u": 34,
          "v": 35,
          "dist": 78.52
        },
        {
          "u": 35,
          "v": 36,
          "dist": 157.13
        },
        {
          "u": 36,
          "v": 51,
          "dist": 171.95
        },
        {
          "u": 37,
          "v": 38,
          "dist": 55.44
        },
        {
          "u": 38,
          "v": 39,
          "dist": 56.32
        },
        {
          "u": 39,
          "v": 40,
          "dist": 167.2
        },
        {
          "u": 40,
          "v": 41,
          "dist": 183.1
        },
        {
          "u": 40,
          "v": 53,
          "dist": 85.59
        },
        {
          "u": 40,
          "v": 54,
          "dist": 97.62
        },
        {
          "u": 41,
          "v": 42,
          "dist": 91.55
        },
        {
          "u": 42,
          "v": 43,
          "dist": 90.67
        },
        {
          "u": 43,
          "v": 44,
          "dist": 32.14
        },
        {
          "u": 44,
          "v": 45,
          "dist": 32.25
        },
        {
          "u": 45,
          "v": 46,
          "dist": 63.39
        },
        {
          "u": 46,
          "v": 47,
          "dist": 182.21
        },
        {
          "u": 46,
          "v": 82,
          "dist": 194.22
        },
        {
          "u": 47,
          "v": 48,
          "dist": 78.52
        },
        {
          "u": 47,
          "v": 59,
          "dist": 86.58
        },
        {
          "u": 47,
          "v": 60,
          "dist": 97.62
        },
        {
          "u": 48,
          "v": 49,
          "dist": 78.52
        },
        {
          "u": 49,
          "v": 50,
          "dist": 78.52
        },
        {
          "u": 50,
          "v": 51,
          "dist": 78.52
        },
        {
          "u": 52,
          "v": 66,
          "dist": 48.37
        },
        {
          "u": 52,
          "v": 71,
          "dist": 33.93
        },
        {
          "u": 54,
          "v": 55,
          "dist": 48.37
        },
        {
          "u": 55,
          "v": 56,
          "dist": 43.92
        },
        {
          "u": 56,
          "v": 57,
          "dist": 4.34
        },
        {
          "u": 56,
          "v": 102,
          "dist": 69.84
        },
        {
          "u": 56,
          "v": 103,
          "dist": 40.62
        },
        {
          "u": 58,
          "v": 88,
          "dist": 39.9
        },
        {
          "u": 60,
          "v": 61,
          "dist": 146.87
        },
        {
          "u": 61,
          "v": 110,
          "dist": 44.94
        },
        {
          "u": 62,
          "v": 63,
          "dist": 81.61
        },
        {
          "u": 62,
          "v": 72,
          "dist": 41.04
        },
        {
          "u": 63,
          "v": 64,
          "dist": 82.49
        },
        {
          "u": 64,
          "v": 65,
          "dist": 82.49
        },
        {
          "u": 65,
          "v": 66,
          "dist": 82.49
        },
        {
          "u": 67,
          "v": 68,
          "dist": 81.9
        },
        {
          "u": 67,
          "v": 72,
          "dist": 41.0
        },
        {
          "u": 68,
          "v": 69,
          "dist": 82.49
        },
        {
          "u": 69,
          "v": 70,
          "dist": 82.49
        },
        {
          "u": 70,
          "v": 71,
          "dist": 82.11
        },
        {
          "u": 72,
          "v": 73,
          "dist": 11.0
        },
        {
          "u": 74,
          "v": 75,
          "dist": 49.29
        },
        {
          "u": 75,
          "v": 76,
          "dist": 49.25
        },
        {
          "u": 76,
          "v": 77,
          "dist": 49.37
        },
        {
          "u": 77,
          "v": 78,
          "dist": 50.1
        },
        {
          "u": 78,
          "v": 79,
          "dist": 43.44
        },
        {
          "u": 79,
          "v": 80,
          "dist": 43.29
        },
        {
          "u": 80,
          "v": 81,
          "dist": 87.57
        },
        {
          "u": 81,
          "v": 88,
          "dist": 7.07
        },
        {
          "u": 82,
          "v": 111,
          "dist": 5.1
        },
        {
          "u": 83,
          "v": 84,
          "dist": 66.27
        },
        {
          "u": 84,
          "v": 85,
          "dist": 17.03
        },
        {
          "u": 86,
          "v": 87,
          "dist": 263.06
        },
        {
          "u": 87,
          "v": 91,
          "dist": 40.0
        },
        {
          "u": 87,
          "v": 95,
          "dist": 44.72
        },
        {
          "u": 88,
          "v": 89,
          "dist": 8.18
        },
        {
          "u": 89,
          "v": 90,
          "dist": 49.37
        },
        {
          "u": 91,
          "v": 92,
          "dist": 44.72
        },
        {
          "u": 92,
          "v": 93,
          "dist": 28.28
        },
        {
          "u": 93,
          "v": 94,
          "dist": 121.66
        },
        {
          "u": 94,
          "v": 112,
          "dist": 15.24
        },
        {
          "u": 95,
          "v": 96,
          "dist": 28.28
        },
        {
          "u": 96,
          "v": 97,
          "dist": 40.0
        },
        {
          "u": 97,
          "v": 98,
          "dist": 120.0
        },
        {
          "u": 100,
          "v": 101,
          "dist": 55.23
        },
        {
          "u": 101,
          "v": 102,
          "dist": 55.23
        },
        {
          "u": 103,
          "v": 104,
          "dist": 110.45
        },
        {
          "u": 104,
          "v": 105,
          "dist": 110.45
        },
        {
          "u": 105,
          "v": 106,
          "dist": 42.05
        },
        {
          "u": 106,
          "v": 107,
          "dist": 81.39
        },
        {
          "u": 107,
          "v": 108,
          "dist": 81.5
        },
        {
          "u": 108,
          "v": 109,
          "dist": 81.5
        },
        {
          "u": 109,
          "v": 110,
          "dist": 115.62
        }
      ],
      "rooms": [
        {
          "id": "room_nanosciences",
          "name": "Amrita Center for Nanosciences",
          "code": "ACN",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 786.5,
          "cy": 360.0,
          "entryX": 852.7,
          "entryY": 352.7,
          "node": 64,
          "isStairs": false
        },
        {
          "id": "room_special_hall",
          "name": "Special Programs Hall / Meditation Hall",
          "code": "SPH-102",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 382.5,
          "cy": 627.0,
          "entryX": 481.8,
          "entryY": 616.1,
          "node": 4,
          "isStairs": false
        },
        {
          "id": "room_gad_office",
          "name": "GAD-PR Office",
          "code": "GAD-103",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 415.5,
          "cy": 702.0,
          "entryX": 423.4,
          "entryY": 749.4,
          "node": 94,
          "isStairs": false
        },
        {
          "id": "room_admin_block_a",
          "name": "Entrance",
          "code": "ADM-BLK-A",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 384.0,
          "cy": 834.5,
          "entryX": 384.0,
          "entryY": 900.0,
          "node": 97,
          "isStairs": false
        },
        {
          "id": "room_admission_office",
          "name": "Admission Office",
          "code": "ADM-105",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 670.0,
          "cy": 659.5,
          "entryX": 676.9,
          "entryY": 714.1,
          "node": 22,
          "isStairs": false
        },
        {
          "id": "room_cir_seminar",
          "name": "CIR Seminar Room",
          "code": "CIR-106",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 861.5,
          "cy": 636.5,
          "entryX": 868.0,
          "entryY": 692.4,
          "node": 24,
          "isStairs": false
        },
        {
          "id": "room_guest_room",
          "name": "Guest Room",
          "code": "GST-107",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 700.5,
          "cy": 937.5,
          "entryX": 694.0,
          "entryY": 886.3,
          "node": 37,
          "isStairs": false
        },
        {
          "id": "room_mini_conf",
          "name": "Mini Conference Room",
          "code": "CONF-MINI",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 443.5,
          "cy": 954.0,
          "entryX": 443.5,
          "entryY": 900.0,
          "node": 98,
          "isStairs": false
        },
        {
          "id": "room_main_conf",
          "name": "Main Conference Room",
          "code": "CONF-MAIN",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 433.5,
          "cy": 1031.5,
          "entryX": 526.3,
          "entryY": 1021.6,
          "node": 17,
          "isStairs": false
        },
        {
          "id": "room_acharya_hall",
          "name": "Acharya Hall",
          "code": "ACH-110",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 606.5,
          "cy": 1157.0,
          "entryX": 599.9,
          "entryY": 1088.3,
          "node": 83,
          "isStairs": false
        },
        {
          "id": "room_stationery",
          "name": "Stationery & Courier",
          "code": "STN-111",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 827.0,
          "cy": 1138.5,
          "entryX": 819.7,
          "entryY": 1058.2,
          "node": 100,
          "isStairs": false
        },
        {
          "id": "room_mfg_lab",
          "name": "Manufacturing Lab",
          "code": "LAB-MFG",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 958.0,
          "cy": 1125.5,
          "entryX": 950.8,
          "entryY": 1046.3,
          "node": 56,
          "isStairs": false
        },
        {
          "id": "room_mat_testing",
          "name": "Material Testing Lab",
          "code": "LAB-MTL",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1102.5,
          "cy": 1110.5,
          "entryX": 1095.5,
          "entryY": 1033.1,
          "node": 104,
          "isStairs": false
        },
        {
          "id": "room_wireless_ctr",
          "name": "Amrita Center for Wireless Networks & Apps",
          "code": "ACWNA",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1015.5,
          "cy": 473.0,
          "entryX": 949.5,
          "entryY": 480.9,
          "node": 71,
          "isStairs": false
        },
        {
          "id": "room_courtyard_west",
          "name": "Courtyard (West)",
          "code": "CYD-WEST",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 723.5,
          "cy": 795.5,
          "entryX": 734.4,
          "entryY": 881.2,
          "node": 38,
          "isStairs": false
        },
        {
          "id": "room_courtyard_central",
          "name": "Courtyard (Central)",
          "code": "CYD-CTR",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1157.0,
          "cy": 745.5,
          "entryX": 1147.6,
          "entryY": 660.0,
          "node": 26,
          "isStairs": false
        },
        {
          "id": "room_director_dean",
          "name": "Director / Associate Dean",
          "code": "DIR-OFFICE",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1184.5,
          "cy": 885.0,
          "entryX": 1178.5,
          "entryY": 830.8,
          "node": 41,
          "isStairs": false
        },
        {
          "id": "room_ladies_infirmary",
          "name": "Ladies Infirmary",
          "code": "INF-118",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1345.0,
          "cy": 866.0,
          "entryX": 1340.0,
          "entryY": 812.2,
          "node": 44,
          "isStairs": false
        },
        {
          "id": "room_metallurgy",
          "name": "Metallurgy Laboratory",
          "code": "LAB-MET",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1239.5,
          "cy": 386.5,
          "entryX": 1247.9,
          "entryY": 455.4,
          "node": 75,
          "isStairs": false
        },
        {
          "id": "room_fluid_mech",
          "name": "Fluid Mechanics Lab",
          "code": "LAB-FML",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1339.5,
          "cy": 374.0,
          "entryX": 1348.1,
          "entryY": 444.1,
          "node": 77,
          "isStairs": false
        },
        {
          "id": "room_cae_cell",
          "name": "C.A.E. Cell",
          "code": "CAE-121",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1434.0,
          "cy": 363.5,
          "entryX": 1441.4,
          "entryY": 433.9,
          "node": 79,
          "isStairs": false
        },
        {
          "id": "room_dynamics_lab",
          "name": "Machine Dynamics Lab",
          "code": "LAB-MDL",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1498.5,
          "cy": 355.5,
          "entryX": 1506.7,
          "entryY": 426.4,
          "node": 80,
          "isStairs": false
        },
        {
          "id": "room_math_dept",
          "name": "Department of Mathematics",
          "code": "MATH-DEPT",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1522.5,
          "cy": 563.5,
          "entryX": 1528.6,
          "entryY": 616.9,
          "node": 32,
          "isStairs": false
        },
        {
          "id": "room_elec_machines",
          "name": "Electrical Machines Lab",
          "code": "LAB-EML",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1745.5,
          "cy": 528.0,
          "entryX": 1752.8,
          "entryY": 591.4,
          "node": 35,
          "isStairs": false
        },
        {
          "id": "room_prayer_hall",
          "name": "Prayer Hall",
          "code": "PRY-125",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1907.5,
          "cy": 509.5,
          "entryX": 1914.7,
          "entryY": 572.9,
          "node": 36,
          "isStairs": false
        },
        {
          "id": "room_courtyard_east",
          "name": "Courtyard (East)",
          "code": "CYD-EAST",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1463.0,
          "cy": 710.0,
          "entryX": 1453.4,
          "entryY": 625.5,
          "node": 31,
          "isStairs": false
        },
        {
          "id": "room_college_admin",
          "name": "College Administration Office",
          "code": "CADM-127",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1554.5,
          "cy": 844.0,
          "entryX": 1548.0,
          "entryY": 788.4,
          "node": 47,
          "isStairs": false
        },
        {
          "id": "room_computer_lab",
          "name": "Computer Lab",
          "code": "LAB-CS",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1763.5,
          "cy": 831.5,
          "entryX": 1755.8,
          "entryY": 764.4,
          "node": 49,
          "isStairs": false
        },
        {
          "id": "room_nanotech_lab",
          "name": "Nanotech Lab",
          "code": "LAB-NANO",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1926.5,
          "cy": 812.0,
          "entryX": 1918.8,
          "entryY": 745.6,
          "node": 51,
          "isStairs": false
        },
        {
          "id": "room_mech_workshop",
          "name": "Mechanical Workshop",
          "code": "LAB-MECH",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1351.0,
          "cy": 1074.5,
          "entryX": 1344.8,
          "entryY": 1011.8,
          "node": 107,
          "isStairs": false
        },
        {
          "id": "room_robotics_lab",
          "name": "CNC Robotics & Autom. Lab",
          "code": "LAB-ROBO",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1448.5,
          "cy": 1063.0,
          "entryX": 1441.6,
          "entryY": 1001.3,
          "node": 108,
          "isStairs": false
        },
        {
          "id": "room_wind_tunnel",
          "name": "Wind Tunnel",
          "code": "LAB-WIND",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1547.5,
          "cy": 1052.5,
          "entryX": 1541.0,
          "entryY": 990.3,
          "node": 109,
          "isStairs": false
        },
        {
          "id": "room_1790266501061",
          "name": "M Tech (Fluid Lab )",
          "code": "LAB-FLUID",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1007.5,
          "cy": 388.5,
          "entryX": 939.5,
          "entryY": 396.0,
          "node": 70,
          "isStairs": false
        },
        {
          "id": "room_1790266683270",
          "name": "Room 36",
          "code": "R-136",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 991.0,
          "cy": 254.0,
          "entryX": 924.7,
          "entryY": 261.3,
          "node": 68,
          "isStairs": false
        },
        {
          "id": "room_1790267011208",
          "name": "Principal Arts and Sciences",
          "code": "Arts and Science",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1279.0,
          "cy": 870.5,
          "entryX": 1272.8,
          "entryY": 819.9,
          "node": 42,
          "isStairs": false
        },
        {
          "id": "room_1790267197118",
          "name": "Conference Room",
          "code": "Conference",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1394.5,
          "cy": 861.5,
          "entryX": 1388.4,
          "entryY": 806.6,
          "node": 45,
          "isStairs": false
        },
        {
          "id": "room_1790267337608",
          "name": "AUMS Web Services",
          "code": "AUMS",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 797.0,
          "cy": 927.5,
          "entryX": 791.4,
          "entryY": 875.1,
          "node": 39,
          "isStairs": false
        },
        {
          "id": "room_1790267611764",
          "name": "Amritheswari Hall ",
          "code": "AMH-101",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 531.5,
          "cy": 464.0,
          "entryX": 540.8,
          "entryY": 537.6,
          "node": 2,
          "isStairs": false
        },
        {
          "id": "room_1790267932589",
          "name": "Students Affair",
          "code": "SA",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1152.0,
          "cy": 604.5,
          "entryX": 1158.0,
          "entryY": 658.8,
          "node": 26,
          "isStairs": false
        },
        {
          "id": "room_1790267966500",
          "name": "Reserve",
          "code": "",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1249.0,
          "cy": 592.5,
          "entryX": 1255.2,
          "entryY": 648.1,
          "node": 28,
          "isStairs": false
        },
        {
          "id": "room_1790268001235",
          "name": "Principal",
          "code": "",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1343.0,
          "cy": 580.5,
          "entryX": 1349.1,
          "entryY": 637.7,
          "node": 30,
          "isStairs": false
        },
        {
          "id": "room_1790268898290",
          "name": "Courtyard (Far East) ",
          "code": "CYD-Far EAST",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1790.0,
          "cy": 674.5,
          "entryX": 1799.8,
          "entryY": 759.3,
          "node": 49,
          "isStairs": false
        },
        {
          "id": "room_1790578035647",
          "name": "Stairs",
          "code": "R-145",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1369.0,
          "cy": 476.5,
          "entryX": 1365.2,
          "entryY": 442.1,
          "node": 77,
          "isStairs": true,
          "stairColId": "STAIR-NE"
        },
        {
          "id": "room_1790578073580",
          "name": "Stairs",
          "code": "R-146",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 930.0,
          "cy": 1020.0,
          "entryX": 932.5,
          "entryY": 1048.0,
          "node": 102,
          "isStairs": true,
          "stairColId": "STAIR-CS"
        },
        {
          "id": "room_1790578100156",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1210.0,
          "cy": 1080.0,
          "entryX": 1204.8,
          "entryY": 1023.2,
          "node": 105,
          "isStairs": false
        },
        {
          "id": "room_1790578145285",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1677.0,
          "cy": 1060.0,
          "entryX": 1656.0,
          "entryY": 1022.0,
          "node": 61,
          "isStairs": false
        },
        {
          "id": "room_1790578197842",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 480.0,
          "cy": 1093.5,
          "entryX": 533.7,
          "entryY": 1087.3,
          "node": 19,
          "isStairs": false
        },
        {
          "id": "room_1790578250255",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 425.5,
          "cy": 553.5,
          "entryX": 474.2,
          "entryY": 548.1,
          "node": 2,
          "isStairs": false
        },
        {
          "id": "room_1790578281913",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 867.0,
          "cy": 118.5,
          "entryX": 871.5,
          "entryY": 158.4,
          "node": 73,
          "isStairs": false
        },
        {
          "id": "room_1790578307230",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1594.0,
          "cy": 324.0,
          "entryX": 1580.0,
          "entryY": 360.0,
          "node": 90,
          "isStairs": false
        },
        {
          "id": "room_1790578386471",
          "name": "Stairs",
          "code": "R-152",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 890.0,
          "cy": 330.0,
          "entryX": 850.7,
          "entryY": 334.3,
          "node": 64,
          "isStairs": true,
          "stairColId": "STAIR-N"
        },
        {
          "id": "room_1790578435142",
          "name": "Stairs",
          "code": "R-153",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 989.0,
          "cy": 764.5,
          "entryX": 947.9,
          "entryY": 769.1,
          "node": 53,
          "isStairs": true,
          "stairColId": "STAIR-CTR"
        },
        {
          "id": "room_1790578489388",
          "name": "Stairs",
          "code": "R-154",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 1660.0,
          "cy": 689.5,
          "entryX": 1619.1,
          "entryY": 694.3,
          "node": 59,
          "isStairs": true,
          "stairColId": "STAIR-E"
        },
        {
          "id": "room_1790578512841",
          "name": "Stairs",
          "code": "R-155",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 572.0,
          "cy": 940.0,
          "entryX": 567.7,
          "entryY": 900.1,
          "node": 13,
          "isStairs": true,
          "stairColId": "STAIR-SW"
        },
        {
          "id": "room_1790578548474",
          "name": "Stairs",
          "code": "R-156",
          "floor": "ground",
          "floorIdx": 0,
          "floorTitle": "Ground Floor",
          "cx": 537.0,
          "cy": 690.0,
          "entryX": 541.4,
          "entryY": 729.5,
          "node": 8,
          "isStairs": true,
          "stairColId": "STAIR-NW"
        }
      ],
      "stairs": {
        "STAIR-NW": {
          "colId": "STAIR-NW",
          "colName": "North-West Stairs (Near Reception / CAD)",
          "roomId": "room_1790578548474",
          "node": 8,
          "entryX": 541.4,
          "entryY": 729.5,
          "cx": 537.0,
          "cy": 690.0
        },
        "STAIR-SW": {
          "colId": "STAIR-SW",
          "colName": "South-West Stairs (Near Acharya / Conf)",
          "roomId": "room_1790578512841",
          "node": 13,
          "entryX": 567.7,
          "entryY": 900.1,
          "cx": 572.0,
          "cy": 940.0
        },
        "STAIR-N": {
          "colId": "STAIR-N",
          "colName": "North Wing Stairs (Near Physics / Chem)",
          "roomId": "room_1790578386471",
          "node": 64,
          "entryX": 850.7,
          "entryY": 334.3,
          "cx": 890.0,
          "cy": 330.0
        },
        "STAIR-CS": {
          "colId": "STAIR-CS",
          "colName": "Central-South Stairs (Near Courtyard)",
          "roomId": "room_1790578073580",
          "node": 102,
          "entryX": 932.5,
          "entryY": 1048.0,
          "cx": 930.0,
          "cy": 1020.0
        },
        "STAIR-CTR": {
          "colId": "STAIR-CTR",
          "colName": "Central Spine Stairs (Main Axis)",
          "roomId": "room_1790578435142",
          "node": 53,
          "entryX": 947.9,
          "entryY": 769.1,
          "cx": 989.0,
          "cy": 764.5
        },
        "STAIR-NE": {
          "colId": "STAIR-NE",
          "colName": "North-East Stairs (Engineering / Staff)",
          "roomId": "room_1790578035647",
          "node": 77,
          "entryX": 1365.2,
          "entryY": 442.1,
          "cx": 1369.0,
          "cy": 476.5
        },
        "STAIR-E": {
          "colId": "STAIR-E",
          "colName": "East Wing Stairs (Near Computer Labs)",
          "roomId": "room_1790578489388",
          "node": 59,
          "entryX": 1619.1,
          "entryY": 694.3,
          "cx": 1660.0,
          "cy": 689.5
        }
      }
    },
    "first": {
      "floor": "first",
      "floorIdx": 1,
      "title": "First Floor",
      "nodes": [
        [
          472.0,
          527.0
        ],
        [
          473.0,
          537.0
        ],
        [
          474.0,
          546.0
        ],
        [
          476.0,
          564.0
        ],
        [
          480.0,
          600.0
        ],
        [
          488.0,
          673.0
        ],
        [
          489.0,
          683.0
        ],
        [
          490.0,
          692.0
        ],
        [
          491.0,
          701.0
        ],
        [
          492.0,
          710.0
        ],
        [
          493.0,
          719.0
        ],
        [
          494.0,
          728.0
        ],
        [
          494.96,
          734.69
        ],
        [
          496.0,
          746.0
        ],
        [
          504.0,
          818.0
        ],
        [
          512.0,
          891.0
        ],
        [
          514.0,
          906.0
        ],
        [
          516.0,
          927.0
        ],
        [
          518.0,
          945.0
        ],
        [
          520.0,
          963.0
        ],
        [
          524.0,
          1000.0
        ],
        [
          535.0,
          1095.0
        ],
        [
          535.0,
          1098.89
        ],
        [
          536.0,
          1108.0
        ],
        [
          662.0,
          716.0
        ],
        [
          717.0,
          709.0
        ],
        [
          773.0,
          703.0
        ],
        [
          828.0,
          697.0
        ],
        [
          883.0,
          691.0
        ],
        [
          938.48,
          684.16
        ],
        [
          984.0,
          679.0
        ],
        [
          1052.0,
          671.0
        ],
        [
          1120.0,
          663.0
        ],
        [
          1166.0,
          658.0
        ],
        [
          1211.0,
          653.0
        ],
        [
          1256.0,
          648.0
        ],
        [
          1301.63,
          642.78
        ],
        [
          1365.0,
          636.0
        ],
        [
          1428.31,
          628.35
        ],
        [
          1519.0,
          618.0
        ],
        [
          1609.14,
          607.75
        ],
        [
          1687.0,
          599.0
        ],
        [
          1765.0,
          590.0
        ],
        [
          1843.0,
          581.0
        ],
        [
          1882.0,
          577.0
        ],
        [
          1921.12,
          572.2
        ],
        [
          625.0,
          894.0
        ],
        [
          736.0,
          881.0
        ],
        [
          792.0,
          875.0
        ],
        [
          847.0,
          868.0
        ],
        [
          903.0,
          862.0
        ],
        [
          958.0,
          855.0
        ],
        [
          1004.0,
          850.0
        ],
        [
          1049.0,
          845.0
        ],
        [
          1140.0,
          835.0
        ],
        [
          1231.0,
          825.0
        ],
        [
          1276.0,
          820.0
        ],
        [
          1321.0,
          814.0
        ],
        [
          1337.0,
          813.0
        ],
        [
          1385.0,
          807.0
        ],
        [
          1448.0,
          800.0
        ],
        [
          1494.0,
          795.0
        ],
        [
          1539.0,
          790.0
        ],
        [
          1584.0,
          785.0
        ],
        [
          1629.0,
          779.0
        ],
        [
          1707.0,
          770.0
        ],
        [
          1785.0,
          761.0
        ],
        [
          1863.0,
          752.0
        ],
        [
          1902.0,
          748.0
        ],
        [
          1920.72,
          745.6
        ],
        [
          1941.0,
          743.0
        ],
        [
          916.97,
          495.38
        ],
        [
          948.0,
          770.0
        ],
        [
          969.0,
          952.0
        ],
        [
          975.0,
          1000.0
        ],
        [
          980.03,
          1048.8
        ],
        [
          1583.0,
          359.0
        ],
        [
          1589.17,
          418.09
        ],
        [
          1619.0,
          694.0
        ],
        [
          1650.83,
          969.98
        ],
        [
          1657.0,
          1024.0
        ],
        [
          832.04,
          173.93
        ],
        [
          842.0,
          255.0
        ],
        [
          851.0,
          337.0
        ],
        [
          860.0,
          419.0
        ],
        [
          869.28,
          500.81
        ],
        [
          913.51,
          164.65
        ],
        [
          923.0,
          246.0
        ],
        [
          932.0,
          328.0
        ],
        [
          941.0,
          410.0
        ],
        [
          950.75,
          491.53
        ],
        [
          873.0,
          169.0
        ],
        [
          871.53,
          158.36
        ],
        [
          1220.0,
          460.0
        ],
        [
          1270.0,
          455.0
        ],
        [
          1319.0,
          449.0
        ],
        [
          1368.0,
          444.0
        ],
        [
          1406.77,
          439.25
        ],
        [
          1417.0,
          438.0
        ],
        [
          1461.0,
          433.0
        ],
        [
          1504.0,
          428.0
        ],
        [
          1412.0,
          487.0
        ],
        [
          1418.0,
          534.0
        ],
        [
          1469.41,
          989.06
        ],
        [
          1469.86,
          992.99
        ],
        [
          594.0,
          1088.0
        ],
        [
          654.0,
          1081.0
        ],
        [
          684.0,
          1078.0
        ],
        [
          713.0,
          1074.0
        ],
        [
          743.0,
          1071.0
        ],
        [
          796.0,
          1070.0
        ],
        [
          852.0,
          1064.0
        ],
        [
          907.0,
          1058.0
        ],
        [
          963.0,
          1052.0
        ],
        [
          1018.0,
          1045.0
        ],
        [
          1074.0,
          1039.0
        ],
        [
          1102.0,
          1036.0
        ],
        [
          1129.0,
          1033.0
        ],
        [
          1185.0,
          1027.0
        ],
        [
          1240.0,
          1020.0
        ],
        [
          1280.0,
          1009.0
        ],
        [
          1328.0,
          1004.0
        ],
        [
          1375.0,
          999.0
        ],
        [
          1423.0,
          994.0
        ],
        [
          1518.0,
          984.0
        ],
        [
          1565.0,
          979.0
        ],
        [
          1613.0,
          974.0
        ],
        [
          1660.0,
          969.0
        ],
        [
          1931.0,
          576.0
        ],
        [
          1940.0,
          580.0
        ],
        [
          1940.0,
          600.0
        ],
        [
          1950.0,
          702.0
        ],
        [
          1920.0,
          740.0
        ],
        [
          543.0,
          538.0
        ],
        [
          611.0,
          530.0
        ],
        [
          680.0,
          522.0
        ]
      ],
      "edges": [
        {
          "u": 0,
          "v": 1,
          "dist": 10.05
        },
        {
          "u": 1,
          "v": 2,
          "dist": 9.06
        },
        {
          "u": 2,
          "v": 3,
          "dist": 18.11
        },
        {
          "u": 2,
          "v": 133,
          "dist": 69.46
        },
        {
          "u": 3,
          "v": 4,
          "dist": 36.22
        },
        {
          "u": 4,
          "v": 5,
          "dist": 73.44
        },
        {
          "u": 5,
          "v": 6,
          "dist": 10.05
        },
        {
          "u": 6,
          "v": 7,
          "dist": 9.06
        },
        {
          "u": 7,
          "v": 8,
          "dist": 9.06
        },
        {
          "u": 8,
          "v": 9,
          "dist": 9.06
        },
        {
          "u": 9,
          "v": 10,
          "dist": 9.06
        },
        {
          "u": 10,
          "v": 11,
          "dist": 9.06
        },
        {
          "u": 11,
          "v": 12,
          "dist": 6.76
        },
        {
          "u": 12,
          "v": 13,
          "dist": 11.36
        },
        {
          "u": 12,
          "v": 24,
          "dist": 168.08
        },
        {
          "u": 13,
          "v": 14,
          "dist": 72.44
        },
        {
          "u": 14,
          "v": 15,
          "dist": 73.44
        },
        {
          "u": 15,
          "v": 16,
          "dist": 15.13
        },
        {
          "u": 16,
          "v": 17,
          "dist": 21.1
        },
        {
          "u": 16,
          "v": 46,
          "dist": 111.65
        },
        {
          "u": 17,
          "v": 18,
          "dist": 18.11
        },
        {
          "u": 18,
          "v": 19,
          "dist": 18.11
        },
        {
          "u": 19,
          "v": 20,
          "dist": 37.22
        },
        {
          "u": 20,
          "v": 21,
          "dist": 95.63
        },
        {
          "u": 21,
          "v": 22,
          "dist": 3.89
        },
        {
          "u": 21,
          "v": 105,
          "dist": 59.41
        },
        {
          "u": 22,
          "v": 23,
          "dist": 9.16
        },
        {
          "u": 24,
          "v": 25,
          "dist": 55.44
        },
        {
          "u": 25,
          "v": 26,
          "dist": 56.32
        },
        {
          "u": 26,
          "v": 27,
          "dist": 55.33
        },
        {
          "u": 27,
          "v": 28,
          "dist": 55.33
        },
        {
          "u": 28,
          "v": 29,
          "dist": 55.9
        },
        {
          "u": 29,
          "v": 30,
          "dist": 45.81
        },
        {
          "u": 29,
          "v": 71,
          "dist": 190.0
        },
        {
          "u": 29,
          "v": 72,
          "dist": 86.37
        },
        {
          "u": 30,
          "v": 31,
          "dist": 68.47
        },
        {
          "u": 31,
          "v": 32,
          "dist": 68.47
        },
        {
          "u": 32,
          "v": 33,
          "dist": 46.27
        },
        {
          "u": 33,
          "v": 34,
          "dist": 45.28
        },
        {
          "u": 34,
          "v": 35,
          "dist": 45.28
        },
        {
          "u": 35,
          "v": 36,
          "dist": 45.93
        },
        {
          "u": 36,
          "v": 37,
          "dist": 63.73
        },
        {
          "u": 36,
          "v": 57,
          "dist": 172.31
        },
        {
          "u": 37,
          "v": 38,
          "dist": 63.77
        },
        {
          "u": 38,
          "v": 39,
          "dist": 91.28
        },
        {
          "u": 38,
          "v": 102,
          "dist": 94.91
        },
        {
          "u": 39,
          "v": 40,
          "dist": 90.72
        },
        {
          "u": 40,
          "v": 41,
          "dist": 78.35
        },
        {
          "u": 40,
          "v": 77,
          "dist": 190.71
        },
        {
          "u": 40,
          "v": 78,
          "dist": 86.81
        },
        {
          "u": 41,
          "v": 42,
          "dist": 78.52
        },
        {
          "u": 42,
          "v": 43,
          "dist": 78.52
        },
        {
          "u": 43,
          "v": 44,
          "dist": 39.2
        },
        {
          "u": 44,
          "v": 45,
          "dist": 39.41
        },
        {
          "u": 45,
          "v": 128,
          "dist": 10.59
        },
        {
          "u": 45,
          "v": 130,
          "dist": 33.6
        },
        {
          "u": 46,
          "v": 47,
          "dist": 111.76
        },
        {
          "u": 47,
          "v": 48,
          "dist": 56.32
        },
        {
          "u": 48,
          "v": 49,
          "dist": 55.44
        },
        {
          "u": 49,
          "v": 50,
          "dist": 56.32
        },
        {
          "u": 50,
          "v": 51,
          "dist": 55.44
        },
        {
          "u": 51,
          "v": 52,
          "dist": 46.27
        },
        {
          "u": 51,
          "v": 72,
          "dist": 85.59
        },
        {
          "u": 51,
          "v": 73,
          "dist": 97.62
        },
        {
          "u": 52,
          "v": 53,
          "dist": 45.28
        },
        {
          "u": 53,
          "v": 54,
          "dist": 91.55
        },
        {
          "u": 54,
          "v": 55,
          "dist": 91.55
        },
        {
          "u": 55,
          "v": 56,
          "dist": 45.28
        },
        {
          "u": 56,
          "v": 57,
          "dist": 45.4
        },
        {
          "u": 57,
          "v": 58,
          "dist": 16.03
        },
        {
          "u": 58,
          "v": 59,
          "dist": 48.37
        },
        {
          "u": 59,
          "v": 60,
          "dist": 63.39
        },
        {
          "u": 60,
          "v": 61,
          "dist": 46.27
        },
        {
          "u": 60,
          "v": 103,
          "dist": 190.27
        },
        {
          "u": 61,
          "v": 62,
          "dist": 45.28
        },
        {
          "u": 62,
          "v": 63,
          "dist": 45.28
        },
        {
          "u": 63,
          "v": 64,
          "dist": 45.4
        },
        {
          "u": 64,
          "v": 65,
          "dist": 78.52
        },
        {
          "u": 64,
          "v": 78,
          "dist": 85.59
        },
        {
          "u": 64,
          "v": 79,
          "dist": 192.22
        },
        {
          "u": 65,
          "v": 66,
          "dist": 78.52
        },
        {
          "u": 66,
          "v": 67,
          "dist": 78.52
        },
        {
          "u": 67,
          "v": 68,
          "dist": 39.2
        },
        {
          "u": 68,
          "v": 69,
          "dist": 18.87
        },
        {
          "u": 69,
          "v": 70,
          "dist": 20.45
        },
        {
          "u": 69,
          "v": 132,
          "dist": 5.65
        },
        {
          "u": 70,
          "v": 131,
          "dist": 41.98
        },
        {
          "u": 70,
          "v": 132,
          "dist": 21.21
        },
        {
          "u": 71,
          "v": 85,
          "dist": 48.0
        },
        {
          "u": 71,
          "v": 90,
          "dist": 34.0
        },
        {
          "u": 73,
          "v": 74,
          "dist": 48.37
        },
        {
          "u": 74,
          "v": 75,
          "dist": 49.06
        },
        {
          "u": 76,
          "v": 77,
          "dist": 59.41
        },
        {
          "u": 77,
          "v": 100,
          "dist": 85.74
        },
        {
          "u": 79,
          "v": 80,
          "dist": 54.37
        },
        {
          "u": 79,
          "v": 126,
          "dist": 38.04
        },
        {
          "u": 79,
          "v": 127,
          "dist": 9.22
        },
        {
          "u": 81,
          "v": 82,
          "dist": 81.68
        },
        {
          "u": 81,
          "v": 91,
          "dist": 41.26
        },
        {
          "u": 82,
          "v": 83,
          "dist": 82.49
        },
        {
          "u": 83,
          "v": 84,
          "dist": 82.49
        },
        {
          "u": 84,
          "v": 85,
          "dist": 82.33
        },
        {
          "u": 86,
          "v": 87,
          "dist": 81.9
        },
        {
          "u": 86,
          "v": 91,
          "dist": 40.74
        },
        {
          "u": 87,
          "v": 88,
          "dist": 82.49
        },
        {
          "u": 88,
          "v": 89,
          "dist": 82.49
        },
        {
          "u": 89,
          "v": 90,
          "dist": 82.11
        },
        {
          "u": 91,
          "v": 92,
          "dist": 10.74
        },
        {
          "u": 93,
          "v": 94,
          "dist": 50.25
        },
        {
          "u": 94,
          "v": 95,
          "dist": 49.37
        },
        {
          "u": 95,
          "v": 96,
          "dist": 49.25
        },
        {
          "u": 96,
          "v": 97,
          "dist": 39.06
        },
        {
          "u": 97,
          "v": 98,
          "dist": 10.31
        },
        {
          "u": 97,
          "v": 101,
          "dist": 48.04
        },
        {
          "u": 98,
          "v": 99,
          "dist": 44.28
        },
        {
          "u": 99,
          "v": 100,
          "dist": 43.29
        },
        {
          "u": 101,
          "v": 102,
          "dist": 47.38
        },
        {
          "u": 103,
          "v": 104,
          "dist": 3.96
        },
        {
          "u": 103,
          "v": 123,
          "dist": 46.67
        },
        {
          "u": 103,
          "v": 124,
          "dist": 48.85
        },
        {
          "u": 105,
          "v": 106,
          "dist": 60.41
        },
        {
          "u": 106,
          "v": 107,
          "dist": 30.15
        },
        {
          "u": 107,
          "v": 108,
          "dist": 29.27
        },
        {
          "u": 108,
          "v": 109,
          "dist": 30.15
        },
        {
          "u": 110,
          "v": 111,
          "dist": 56.32
        },
        {
          "u": 111,
          "v": 112,
          "dist": 55.33
        },
        {
          "u": 112,
          "v": 113,
          "dist": 56.32
        },
        {
          "u": 113,
          "v": 114,
          "dist": 55.44
        },
        {
          "u": 114,
          "v": 115,
          "dist": 56.32
        },
        {
          "u": 115,
          "v": 116,
          "dist": 28.16
        },
        {
          "u": 116,
          "v": 117,
          "dist": 27.17
        },
        {
          "u": 117,
          "v": 118,
          "dist": 56.32
        },
        {
          "u": 118,
          "v": 119,
          "dist": 55.44
        },
        {
          "u": 119,
          "v": 120,
          "dist": 41.48
        },
        {
          "u": 120,
          "v": 121,
          "dist": 48.26
        },
        {
          "u": 121,
          "v": 122,
          "dist": 47.27
        },
        {
          "u": 122,
          "v": 123,
          "dist": 48.26
        },
        {
          "u": 124,
          "v": 125,
          "dist": 47.27
        },
        {
          "u": 125,
          "v": 126,
          "dist": 48.26
        },
        {
          "u": 128,
          "v": 129,
          "dist": 9.85
        },
        {
          "u": 129,
          "v": 130,
          "dist": 20.0
        },
        {
          "u": 133,
          "v": 134,
          "dist": 68.47
        },
        {
          "u": 134,
          "v": 135,
          "dist": 69.46
        }
      ],
      "rooms": [
        {
          "id": "f1_room_nanosciences",
          "name": "N-107 \u2014 Physics Lab",
          "code": "ACN",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 786.5,
          "cy": 360.0,
          "entryX": 852.7,
          "entryY": 352.7,
          "node": 83,
          "isStairs": false
        },
        {
          "id": "f1_room_special_hall",
          "name": "A-105 \u2014 General Administration Dept. (CAD)",
          "code": "SPH-102",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 382.5,
          "cy": 627.0,
          "entryX": 481.8,
          "entryY": 616.1,
          "node": 4,
          "isStairs": false
        },
        {
          "id": "f1_room_gad_office",
          "name": "ICTS \u2014 Reprographics Center",
          "code": "GAD-103",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 415.5,
          "cy": 702.0,
          "entryX": 490.2,
          "entryY": 693.7,
          "node": 7,
          "isStairs": false
        },
        {
          "id": "f1_room_admin_block_a",
          "name": "A-104 \u2014 Accounts Office",
          "code": "ADM-BLK-A",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 384.0,
          "cy": 832.5,
          "entryX": 504.1,
          "entryY": 819.3,
          "node": 14,
          "isStairs": false
        },
        {
          "id": "f1_room_admission_office",
          "name": "N-101",
          "code": "ADM-105",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 668.0,
          "cy": 661.5,
          "entryX": 674.7,
          "entryY": 714.4,
          "node": 24,
          "isStairs": false
        },
        {
          "id": "f1_room_cir_seminar",
          "name": "N-103",
          "code": "CIR-106",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 861.5,
          "cy": 638.5,
          "entryX": 867.4,
          "entryY": 692.7,
          "node": 28,
          "isStairs": false
        },
        {
          "id": "f1_room_guest_room",
          "name": "S-101",
          "code": "GST-107",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 700.5,
          "cy": 937.5,
          "entryX": 694.5,
          "entryY": 885.9,
          "node": 47,
          "isStairs": false
        },
        {
          "id": "f1_room_mini_conf",
          "name": "A-104A \u2014 Reserve",
          "code": "CONF-MINI",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 443.5,
          "cy": 954.0,
          "entryX": 518.1,
          "entryY": 945.7,
          "node": 18,
          "isStairs": false
        },
        {
          "id": "f1_room_main_conf",
          "name": "A-103 \u2014 ICTS",
          "code": "CONF-MAIN",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 433.5,
          "cy": 1031.5,
          "entryX": 526.4,
          "entryY": 1020.7,
          "node": 20,
          "isStairs": false
        },
        {
          "id": "f1_room_acharya_hall",
          "name": "A-102 \u2014 ICTS-Stores",
          "code": "ACH-110",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 606.5,
          "cy": 1157.0,
          "entryX": 598.4,
          "entryY": 1087.5,
          "node": 105,
          "isStairs": false
        },
        {
          "id": "f1_room_stationery",
          "name": "A-101 \u2014 ICTS Server Room",
          "code": "STN-111",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 827.0,
          "cy": 1138.5,
          "entryX": 819.4,
          "entryY": 1067.5,
          "node": 110,
          "isStairs": false
        },
        {
          "id": "f1_room_mfg_lab",
          "name": "S-104 \u2014 Dept. of English / MSW / Physical Education / Philosophy",
          "code": "LAB-MFG",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 958.0,
          "cy": 1125.5,
          "entryX": 950.3,
          "entryY": 1053.4,
          "node": 113,
          "isStairs": false
        },
        {
          "id": "f1_room_mat_testing",
          "name": "S-105 \u2014 Cisco Lab / ICPC Lab / MSW Specialization",
          "code": "LAB-MTL",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1102.5,
          "cy": 1110.5,
          "entryX": 1094.6,
          "entryY": 1036.8,
          "node": 116,
          "isStairs": false
        },
        {
          "id": "f1_room_wireless_ctr",
          "name": "N-108 \u2014 B.Tech Chemistry Lab",
          "code": "ACWNA",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1015.5,
          "cy": 473.0,
          "entryX": 949.5,
          "entryY": 480.9,
          "node": 90,
          "isStairs": false
        },
        {
          "id": "f1_room_north_wing",
          "name": "North Corridor Wing",
          "code": "CORR-N",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 890.0,
          "cy": 330.0,
          "entryX": 850.7,
          "entryY": 334.3,
          "node": 83,
          "isStairs": false
        },
        {
          "id": "f1_room_director_dean",
          "name": "S-107",
          "code": "DIR-OFFICE",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1184.5,
          "cy": 885.0,
          "entryX": 1178.5,
          "entryY": 830.8,
          "node": 54,
          "isStairs": false
        },
        {
          "id": "f1_room_ladies_infirmary",
          "name": "HOD-ECE",
          "code": "INF-118",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1345.0,
          "cy": 866.0,
          "entryX": 1338.4,
          "entryY": 812.8,
          "node": 58,
          "isStairs": false
        },
        {
          "id": "f1_room_metallurgy",
          "name": "N-116 \u2014 EEM Lab",
          "code": "LAB-MET",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1239.5,
          "cy": 386.5,
          "entryX": 1246.6,
          "entryY": 457.3,
          "node": 94,
          "isStairs": false
        },
        {
          "id": "f1_room_fluid_mech",
          "name": "N-116A \u2014 Control & Instrum. Lab",
          "code": "LAB-FML",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1339.5,
          "cy": 374.0,
          "entryX": 1346.9,
          "entryY": 446.2,
          "node": 96,
          "isStairs": false
        },
        {
          "id": "f1_room_cae_cell",
          "name": "N-119",
          "code": "CAE-121",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1434.0,
          "cy": 363.5,
          "entryX": 1442.1,
          "entryY": 435.1,
          "node": 99,
          "isStairs": false
        },
        {
          "id": "f1_room_dynamics_lab",
          "name": "N-117 \u2014 Power & Energy Lab (EEE)",
          "code": "LAB-MDL",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1498.5,
          "cy": 355.5,
          "entryX": 1506.9,
          "entryY": 427.7,
          "node": 100,
          "isStairs": false
        },
        {
          "id": "f1_room_math_dept",
          "name": "N-118 \u2014 CSE Staff Room",
          "code": "MATH-DEPT",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1522.5,
          "cy": 563.5,
          "entryX": 1528.6,
          "entryY": 616.9,
          "node": 39,
          "isStairs": false
        },
        {
          "id": "f1_room_elec_machines",
          "name": "N-120",
          "code": "LAB-EML",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1745.5,
          "cy": 528.0,
          "entryX": 1752.8,
          "entryY": 591.4,
          "node": 42,
          "isStairs": false
        },
        {
          "id": "f1_room_prayer_hall",
          "name": "Room 12",
          "code": "PRY-125",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1907.5,
          "cy": 509.5,
          "entryX": 1915.3,
          "entryY": 572.9,
          "node": 45,
          "isStairs": false
        },
        {
          "id": "f1_room_college_admin",
          "name": "S-114 \u2014 ECE Staff Room",
          "code": "CADM-127",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1554.5,
          "cy": 844.0,
          "entryX": 1548.4,
          "entryY": 789.0,
          "node": 62,
          "isStairs": false
        },
        {
          "id": "f1_room_computer_lab",
          "name": "S-115 \u2014 Computer Lab",
          "code": "LAB-CS",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1763.5,
          "cy": 831.5,
          "entryX": 1755.8,
          "entryY": 764.4,
          "node": 66,
          "isStairs": false
        },
        {
          "id": "f1_room_nanotech_lab",
          "name": "S-117 \u2014 Micro Processor Lab",
          "code": "LAB-NANO",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1955.5,
          "cy": 652.5,
          "entryX": 1950.0,
          "entryY": 702.0,
          "node": 131,
          "isStairs": false
        },
        {
          "id": "f1_room_mech_workshop",
          "name": "S-103",
          "code": "LAB-MECH",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1351.0,
          "cy": 1074.5,
          "entryX": 1343.3,
          "entryY": 1002.4,
          "node": 121,
          "isStairs": false
        },
        {
          "id": "f1_room_robotics_lab",
          "name": "S-102",
          "code": "LAB-ROBO",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1448.5,
          "cy": 1063.0,
          "entryX": 1441.0,
          "entryY": 992.1,
          "node": 123,
          "isStairs": false
        },
        {
          "id": "f1_room_wind_tunnel",
          "name": "S-101",
          "code": "LAB-WIND",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1547.5,
          "cy": 1052.5,
          "entryX": 1540.0,
          "entryY": 981.7,
          "node": 124,
          "isStairs": false
        },
        {
          "id": "f1_room_1790266501061",
          "name": "N-109 \u2014 M.Sc Chemistry Lab",
          "code": "LAB-FLUID",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1007.5,
          "cy": 388.5,
          "entryX": 939.5,
          "entryY": 396.0,
          "node": 89,
          "isStairs": false
        },
        {
          "id": "f1_room_1790266683270",
          "name": "N-110 \u2014 Chem. Research Lab",
          "code": "R-136",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 991.0,
          "cy": 254.0,
          "entryX": 924.7,
          "entryY": 261.3,
          "node": 87,
          "isStairs": false
        },
        {
          "id": "f1_room_1790267011208",
          "name": "S-108",
          "code": "Arts and Science",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1281.0,
          "cy": 874.5,
          "entryX": 1275.0,
          "entryY": 820.1,
          "node": 56,
          "isStairs": false
        },
        {
          "id": "f1_room_1790267197118",
          "name": "S-109 \u2014 Chairman CSE Dept.",
          "code": "Conference",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1394.5,
          "cy": 861.5,
          "entryX": 1388.4,
          "entryY": 806.6,
          "node": 59,
          "isStairs": false
        },
        {
          "id": "f1_room_1790267337608",
          "name": "S-102",
          "code": "AUMS",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 797.0,
          "cy": 927.5,
          "entryX": 791.4,
          "entryY": 875.1,
          "node": 48,
          "isStairs": false
        },
        {
          "id": "f1_room_1790267611764",
          "name": "A-108",
          "code": "AMH-101",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 531.5,
          "cy": 464.0,
          "entryX": 540.1,
          "entryY": 538.3,
          "node": 133,
          "isStairs": false
        },
        {
          "id": "f1_room_1790267932589",
          "name": "N-113",
          "code": "SA",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1152.0,
          "cy": 604.5,
          "entryX": 1157.9,
          "entryY": 658.9,
          "node": 33,
          "isStairs": false
        },
        {
          "id": "f1_room_1790267966500",
          "name": "N-114",
          "code": "",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1249.0,
          "cy": 592.5,
          "entryX": 1255.2,
          "entryY": 648.1,
          "node": 35,
          "isStairs": false
        },
        {
          "id": "f1_room_1790268001235",
          "name": "N-115 \u2014 Dept. of CSE/CSA",
          "code": "",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1343.0,
          "cy": 580.5,
          "entryX": 1349.1,
          "entryY": 637.7,
          "node": 37,
          "isStairs": false
        },
        {
          "id": "f1_room_1790500434656",
          "name": "S-105",
          "code": "R-145",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1056.5,
          "cy": 900.0,
          "entryX": 1050.4,
          "entryY": 844.8,
          "node": 53,
          "isStairs": false
        },
        {
          "id": "f1_room_1790500485062",
          "name": "S-103",
          "code": "R-146",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 898.0,
          "cy": 916.0,
          "entryX": 892.3,
          "entryY": 863.1,
          "node": 50,
          "isStairs": false
        },
        {
          "id": "f1_room_1790500552707",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 570.5,
          "cy": 942.5,
          "entryX": 565.9,
          "entryY": 900.4,
          "node": 16,
          "isStairs": true,
          "stairColId": "STAIR-SW"
        },
        {
          "id": "f1_room_1790500614032",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 542.5,
          "cy": 688.5,
          "entryX": 547.0,
          "entryY": 728.9,
          "node": 12,
          "isStairs": true,
          "stairColId": "STAIR-NW"
        },
        {
          "id": "f1_room_1790500619454",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 988.0,
          "cy": 765.0,
          "entryX": 947.9,
          "entryY": 769.4,
          "node": 72,
          "isStairs": true,
          "stairColId": "STAIR-CTR"
        },
        {
          "id": "f1_room_1790500625267",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 889.0,
          "cy": 320.5,
          "entryX": 849.7,
          "entryY": 324.8,
          "node": 83,
          "isStairs": true,
          "stairColId": "STAIR-N"
        },
        {
          "id": "f1_room_1790500631547",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1661.0,
          "cy": 691.5,
          "entryX": 1619.3,
          "entryY": 696.4,
          "node": 78,
          "isStairs": true,
          "stairColId": "STAIR-E"
        },
        {
          "id": "f1_room_1790500639780",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 922.5,
          "cy": 990.5,
          "entryX": 973.0,
          "entryY": 984.2,
          "node": 74,
          "isStairs": true,
          "stairColId": "STAIR-CS"
        },
        {
          "id": "f1_room_1790500650489",
          "name": "Stairs",
          "code": "R-147",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1361.5,
          "cy": 491.5,
          "entryX": 1356.8,
          "entryY": 445.1,
          "node": 96,
          "isStairs": true,
          "stairColId": "STAIR-NE"
        },
        {
          "id": "f1_room_1790500850398",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 869.5,
          "cy": 117.5,
          "entryX": 871.5,
          "entryY": 158.4,
          "node": 92,
          "isStairs": false
        },
        {
          "id": "f1_room_1790500900853",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1676.5,
          "cy": 1056.0,
          "entryX": 1657.0,
          "entryY": 1024.0,
          "node": 80,
          "isStairs": false
        },
        {
          "id": "f1_room_1790500984653",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1210.5,
          "cy": 1079.5,
          "entryX": 1203.5,
          "entryY": 1024.6,
          "node": 118,
          "isStairs": false
        },
        {
          "id": "f1_room_1790501046808",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1594.0,
          "cy": 324.0,
          "entryX": 1583.0,
          "entryY": 359.0,
          "node": 76,
          "isStairs": false
        },
        {
          "id": "f1_room_1790501831784",
          "name": "N-102",
          "code": "ADM-105",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 766.5,
          "cy": 650.5,
          "entryX": 772.1,
          "entryY": 703.1,
          "node": 26,
          "isStairs": false
        },
        {
          "id": "f1_room_1790501909379",
          "name": "CS Staff Room",
          "code": "R-155",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 1007.0,
          "cy": 624.5,
          "entryX": 1013.0,
          "entryY": 675.6,
          "node": 30,
          "isStairs": false
        },
        {
          "id": "f1_room_1790521278087",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 480.0,
          "cy": 1093.0,
          "entryX": 534.0,
          "entryY": 1086.7,
          "node": 21,
          "isStairs": false
        },
        {
          "id": "f1_room_1790521338973",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "first",
          "floorIdx": 1,
          "floorTitle": "First Floor",
          "cx": 425.5,
          "cy": 553.5,
          "entryX": 474.2,
          "entryY": 548.1,
          "node": 2,
          "isStairs": false
        }
      ],
      "stairs": {
        "STAIR-NW": {
          "colId": "STAIR-NW",
          "colName": "North-West Stairs (Near Reception / CAD)",
          "roomId": "f1_room_1790500614032",
          "node": 12,
          "entryX": 547.0,
          "entryY": 728.9,
          "cx": 542.5,
          "cy": 688.5
        },
        "STAIR-SW": {
          "colId": "STAIR-SW",
          "colName": "South-West Stairs (Near Acharya / Conf)",
          "roomId": "f1_room_1790500552707",
          "node": 16,
          "entryX": 565.9,
          "entryY": 900.4,
          "cx": 570.5,
          "cy": 942.5
        },
        "STAIR-N": {
          "colId": "STAIR-N",
          "colName": "North Wing Stairs (Near Physics / Chem)",
          "roomId": "f1_room_1790500625267",
          "node": 83,
          "entryX": 849.7,
          "entryY": 324.8,
          "cx": 889.0,
          "cy": 320.5
        },
        "STAIR-CS": {
          "colId": "STAIR-CS",
          "colName": "Central-South Stairs (Near Courtyard)",
          "roomId": "f1_room_1790500639780",
          "node": 74,
          "entryX": 973.0,
          "entryY": 984.2,
          "cx": 922.5,
          "cy": 990.5
        },
        "STAIR-CTR": {
          "colId": "STAIR-CTR",
          "colName": "Central Spine Stairs (Main Axis)",
          "roomId": "f1_room_1790500619454",
          "node": 72,
          "entryX": 947.9,
          "entryY": 769.4,
          "cx": 988.0,
          "cy": 765.0
        },
        "STAIR-NE": {
          "colId": "STAIR-NE",
          "colName": "North-East Stairs (Engineering / Staff)",
          "roomId": "f1_room_1790500650489",
          "node": 96,
          "entryX": 1356.8,
          "entryY": 445.1,
          "cx": 1361.5,
          "cy": 491.5
        },
        "STAIR-E": {
          "colId": "STAIR-E",
          "colName": "East Wing Stairs (Near Computer Labs)",
          "roomId": "f1_room_1790500631547",
          "node": 78,
          "entryX": 1619.3,
          "entryY": 696.4,
          "cx": 1661.0,
          "cy": 691.5
        }
      }
    },
    "second": {
      "floor": "second",
      "floorIdx": 2,
      "title": "Second Floor",
      "nodes": [
        [
          472.0,
          527.0
        ],
        [
          473.0,
          537.0
        ],
        [
          474.0,
          546.0
        ],
        [
          476.0,
          564.0
        ],
        [
          480.0,
          600.0
        ],
        [
          488.0,
          673.0
        ],
        [
          492.0,
          710.0
        ],
        [
          494.0,
          728.0
        ],
        [
          494.75,
          734.72
        ],
        [
          496.0,
          746.0
        ],
        [
          504.0,
          818.0
        ],
        [
          512.0,
          891.0
        ],
        [
          513.65,
          905.88
        ],
        [
          516.0,
          927.0
        ],
        [
          518.0,
          945.0
        ],
        [
          520.0,
          963.0
        ],
        [
          524.0,
          1000.0
        ],
        [
          534.5,
          1094.53
        ],
        [
          535.0,
          1099.0
        ],
        [
          536.0,
          1108.0
        ],
        [
          662.0,
          719.0
        ],
        [
          717.0,
          712.0
        ],
        [
          773.0,
          706.0
        ],
        [
          828.0,
          699.0
        ],
        [
          884.0,
          693.0
        ],
        [
          939.0,
          686.0
        ],
        [
          985.0,
          681.0
        ],
        [
          1030.0,
          676.0
        ],
        [
          1121.0,
          666.0
        ],
        [
          1167.0,
          661.0
        ],
        [
          1212.0,
          656.0
        ],
        [
          1257.0,
          651.0
        ],
        [
          1302.0,
          645.0
        ],
        [
          1366.0,
          638.0
        ],
        [
          1429.0,
          631.0
        ],
        [
          1519.0,
          621.0
        ],
        [
          1609.0,
          610.0
        ],
        [
          1661.0,
          604.0
        ],
        [
          1712.0,
          598.0
        ],
        [
          1815.0,
          585.0
        ],
        [
          1918.0,
          573.0
        ],
        [
          1944.0,
          570.0
        ],
        [
          625.0,
          894.0
        ],
        [
          681.0,
          888.0
        ],
        [
          736.0,
          881.0
        ],
        [
          792.0,
          875.0
        ],
        [
          847.0,
          868.0
        ],
        [
          903.0,
          862.0
        ],
        [
          958.0,
          855.0
        ],
        [
          1003.0,
          850.0
        ],
        [
          1049.0,
          845.0
        ],
        [
          1095.0,
          840.0
        ],
        [
          1140.0,
          835.0
        ],
        [
          1186.0,
          830.0
        ],
        [
          1231.0,
          824.0
        ],
        [
          1276.0,
          819.0
        ],
        [
          1321.0,
          814.0
        ],
        [
          1337.0,
          812.0
        ],
        [
          1353.0,
          810.0
        ],
        [
          1384.0,
          807.0
        ],
        [
          1448.0,
          800.0
        ],
        [
          1539.0,
          790.0
        ],
        [
          1629.0,
          779.0
        ],
        [
          1707.0,
          770.0
        ],
        [
          1785.0,
          761.0
        ],
        [
          1863.0,
          752.0
        ],
        [
          1941.0,
          743.0
        ],
        [
          917.0,
          495.0
        ],
        [
          949.0,
          770.0
        ],
        [
          969.0,
          952.0
        ],
        [
          972.0,
          976.0
        ],
        [
          975.0,
          1000.0
        ],
        [
          980.0,
          1048.0
        ],
        [
          1583.0,
          359.0
        ],
        [
          1619.0,
          694.0
        ],
        [
          1650.95,
          971.09
        ],
        [
          1657.0,
          1024.0
        ],
        [
          832.04,
          173.93
        ],
        [
          837.0,
          214.0
        ],
        [
          842.0,
          255.0
        ],
        [
          847.0,
          296.0
        ],
        [
          851.0,
          337.0
        ],
        [
          856.0,
          378.0
        ],
        [
          860.0,
          419.0
        ],
        [
          865.0,
          460.0
        ],
        [
          869.28,
          500.81
        ],
        [
          914.0,
          165.0
        ],
        [
          919.0,
          206.0
        ],
        [
          922.0,
          227.0
        ],
        [
          924.0,
          247.0
        ],
        [
          929.0,
          288.0
        ],
        [
          933.0,
          329.0
        ],
        [
          936.0,
          350.0
        ],
        [
          938.0,
          370.0
        ],
        [
          942.0,
          411.0
        ],
        [
          947.0,
          452.0
        ],
        [
          951.0,
          492.0
        ],
        [
          872.77,
          169.29
        ],
        [
          871.53,
          158.36
        ],
        [
          1210.08,
          461.99
        ],
        [
          1259.0,
          456.0
        ],
        [
          1308.0,
          451.0
        ],
        [
          1357.0,
          445.0
        ],
        [
          1406.8,
          439.57
        ],
        [
          1450.0,
          435.0
        ],
        [
          1493.0,
          430.0
        ],
        [
          1580.0,
          420.0
        ],
        [
          1412.0,
          487.0
        ],
        [
          1418.0,
          534.0
        ],
        [
          1469.86,
          992.99
        ],
        [
          595.0,
          1088.0
        ],
        [
          654.0,
          1081.0
        ],
        [
          684.0,
          1078.0
        ],
        [
          714.0,
          1075.0
        ],
        [
          744.0,
          1072.0
        ],
        [
          796.0,
          1070.0
        ],
        [
          852.0,
          1064.0
        ],
        [
          907.0,
          1058.0
        ],
        [
          963.0,
          1052.0
        ],
        [
          1018.0,
          1045.0
        ],
        [
          1074.0,
          1039.0
        ],
        [
          1129.0,
          1033.0
        ],
        [
          1185.0,
          1027.0
        ],
        [
          1240.0,
          1020.0
        ],
        [
          1283.0,
          1012.0
        ],
        [
          1373.0,
          1002.0
        ],
        [
          1418.0,
          997.0
        ],
        [
          1463.0,
          992.0
        ],
        [
          1553.0,
          982.0
        ],
        [
          1643.0,
          972.0
        ],
        [
          480.0,
          540.0
        ],
        [
          530.0,
          535.0
        ],
        [
          580.0,
          530.0
        ],
        [
          630.0,
          525.0
        ],
        [
          680.0,
          520.0
        ],
        [
          1589.27,
          419.03
        ]
      ],
      "edges": [
        {
          "u": 0,
          "v": 1,
          "dist": 10.05
        },
        {
          "u": 0,
          "v": 130,
          "dist": 15.26
        },
        {
          "u": 1,
          "v": 2,
          "dist": 9.06
        },
        {
          "u": 2,
          "v": 3,
          "dist": 18.11
        },
        {
          "u": 3,
          "v": 4,
          "dist": 36.22
        },
        {
          "u": 4,
          "v": 5,
          "dist": 73.44
        },
        {
          "u": 5,
          "v": 6,
          "dist": 37.22
        },
        {
          "u": 6,
          "v": 7,
          "dist": 18.11
        },
        {
          "u": 7,
          "v": 8,
          "dist": 6.76
        },
        {
          "u": 8,
          "v": 9,
          "dist": 11.35
        },
        {
          "u": 8,
          "v": 20,
          "dist": 167.99
        },
        {
          "u": 9,
          "v": 10,
          "dist": 72.44
        },
        {
          "u": 10,
          "v": 11,
          "dist": 73.44
        },
        {
          "u": 11,
          "v": 12,
          "dist": 14.97
        },
        {
          "u": 12,
          "v": 13,
          "dist": 21.25
        },
        {
          "u": 12,
          "v": 42,
          "dist": 111.98
        },
        {
          "u": 13,
          "v": 14,
          "dist": 18.11
        },
        {
          "u": 14,
          "v": 15,
          "dist": 18.11
        },
        {
          "u": 15,
          "v": 16,
          "dist": 37.22
        },
        {
          "u": 16,
          "v": 17,
          "dist": 95.11
        },
        {
          "u": 17,
          "v": 18,
          "dist": 4.5
        },
        {
          "u": 17,
          "v": 110,
          "dist": 60.85
        },
        {
          "u": 18,
          "v": 19,
          "dist": 9.06
        },
        {
          "u": 20,
          "v": 21,
          "dist": 55.44
        },
        {
          "u": 21,
          "v": 22,
          "dist": 56.32
        },
        {
          "u": 22,
          "v": 23,
          "dist": 55.44
        },
        {
          "u": 23,
          "v": 24,
          "dist": 56.32
        },
        {
          "u": 24,
          "v": 25,
          "dist": 55.44
        },
        {
          "u": 25,
          "v": 26,
          "dist": 46.27
        },
        {
          "u": 25,
          "v": 67,
          "dist": 192.26
        },
        {
          "u": 25,
          "v": 68,
          "dist": 84.59
        },
        {
          "u": 26,
          "v": 27,
          "dist": 45.28
        },
        {
          "u": 27,
          "v": 28,
          "dist": 91.55
        },
        {
          "u": 28,
          "v": 29,
          "dist": 46.27
        },
        {
          "u": 29,
          "v": 30,
          "dist": 45.28
        },
        {
          "u": 30,
          "v": 31,
          "dist": 45.28
        },
        {
          "u": 31,
          "v": 32,
          "dist": 45.4
        },
        {
          "u": 32,
          "v": 33,
          "dist": 64.38
        },
        {
          "u": 32,
          "v": 56,
          "dist": 170.06
        },
        {
          "u": 33,
          "v": 34,
          "dist": 63.39
        },
        {
          "u": 34,
          "v": 35,
          "dist": 90.55
        },
        {
          "u": 34,
          "v": 108,
          "dist": 97.62
        },
        {
          "u": 35,
          "v": 36,
          "dist": 90.67
        },
        {
          "u": 36,
          "v": 37,
          "dist": 52.35
        },
        {
          "u": 36,
          "v": 73,
          "dist": 252.34
        },
        {
          "u": 36,
          "v": 74,
          "dist": 84.59
        },
        {
          "u": 37,
          "v": 38,
          "dist": 51.35
        },
        {
          "u": 38,
          "v": 39,
          "dist": 103.82
        },
        {
          "u": 39,
          "v": 40,
          "dist": 103.7
        },
        {
          "u": 40,
          "v": 41,
          "dist": 26.17
        },
        {
          "u": 42,
          "v": 43,
          "dist": 56.32
        },
        {
          "u": 43,
          "v": 44,
          "dist": 55.44
        },
        {
          "u": 44,
          "v": 45,
          "dist": 56.32
        },
        {
          "u": 45,
          "v": 46,
          "dist": 55.44
        },
        {
          "u": 46,
          "v": 47,
          "dist": 56.32
        },
        {
          "u": 47,
          "v": 48,
          "dist": 55.44
        },
        {
          "u": 48,
          "v": 49,
          "dist": 45.28
        },
        {
          "u": 48,
          "v": 68,
          "dist": 85.48
        },
        {
          "u": 48,
          "v": 69,
          "dist": 97.62
        },
        {
          "u": 49,
          "v": 50,
          "dist": 46.27
        },
        {
          "u": 50,
          "v": 51,
          "dist": 46.27
        },
        {
          "u": 51,
          "v": 52,
          "dist": 45.28
        },
        {
          "u": 52,
          "v": 53,
          "dist": 46.27
        },
        {
          "u": 53,
          "v": 54,
          "dist": 45.4
        },
        {
          "u": 54,
          "v": 55,
          "dist": 45.28
        },
        {
          "u": 55,
          "v": 56,
          "dist": 45.28
        },
        {
          "u": 56,
          "v": 57,
          "dist": 16.12
        },
        {
          "u": 57,
          "v": 58,
          "dist": 16.12
        },
        {
          "u": 58,
          "v": 59,
          "dist": 31.14
        },
        {
          "u": 59,
          "v": 60,
          "dist": 64.38
        },
        {
          "u": 60,
          "v": 61,
          "dist": 91.55
        },
        {
          "u": 60,
          "v": 109,
          "dist": 194.22
        },
        {
          "u": 61,
          "v": 62,
          "dist": 90.67
        },
        {
          "u": 62,
          "v": 63,
          "dist": 78.52
        },
        {
          "u": 62,
          "v": 74,
          "dist": 85.59
        },
        {
          "u": 62,
          "v": 75,
          "dist": 193.34
        },
        {
          "u": 63,
          "v": 64,
          "dist": 78.52
        },
        {
          "u": 64,
          "v": 65,
          "dist": 78.52
        },
        {
          "u": 65,
          "v": 66,
          "dist": 78.52
        },
        {
          "u": 67,
          "v": 85,
          "dist": 48.07
        },
        {
          "u": 67,
          "v": 96,
          "dist": 34.13
        },
        {
          "u": 69,
          "v": 70,
          "dist": 24.19
        },
        {
          "u": 70,
          "v": 71,
          "dist": 24.19
        },
        {
          "u": 71,
          "v": 72,
          "dist": 48.26
        },
        {
          "u": 72,
          "v": 118,
          "dist": 17.46
        },
        {
          "u": 72,
          "v": 119,
          "dist": 38.12
        },
        {
          "u": 75,
          "v": 76,
          "dist": 53.25
        },
        {
          "u": 75,
          "v": 129,
          "dist": 8.0
        },
        {
          "u": 77,
          "v": 78,
          "dist": 40.38
        },
        {
          "u": 77,
          "v": 97,
          "dist": 40.99
        },
        {
          "u": 78,
          "v": 79,
          "dist": 41.3
        },
        {
          "u": 79,
          "v": 80,
          "dist": 41.3
        },
        {
          "u": 80,
          "v": 81,
          "dist": 41.19
        },
        {
          "u": 81,
          "v": 82,
          "dist": 41.3
        },
        {
          "u": 82,
          "v": 83,
          "dist": 41.19
        },
        {
          "u": 83,
          "v": 84,
          "dist": 41.3
        },
        {
          "u": 84,
          "v": 85,
          "dist": 41.03
        },
        {
          "u": 86,
          "v": 87,
          "dist": 41.3
        },
        {
          "u": 86,
          "v": 97,
          "dist": 41.45
        },
        {
          "u": 87,
          "v": 88,
          "dist": 21.21
        },
        {
          "u": 88,
          "v": 89,
          "dist": 20.1
        },
        {
          "u": 89,
          "v": 90,
          "dist": 41.3
        },
        {
          "u": 90,
          "v": 91,
          "dist": 41.19
        },
        {
          "u": 91,
          "v": 92,
          "dist": 21.21
        },
        {
          "u": 92,
          "v": 93,
          "dist": 20.1
        },
        {
          "u": 93,
          "v": 94,
          "dist": 41.19
        },
        {
          "u": 94,
          "v": 95,
          "dist": 41.3
        },
        {
          "u": 95,
          "v": 96,
          "dist": 40.2
        },
        {
          "u": 97,
          "v": 98,
          "dist": 11.0
        },
        {
          "u": 99,
          "v": 100,
          "dist": 49.29
        },
        {
          "u": 100,
          "v": 101,
          "dist": 49.25
        },
        {
          "u": 101,
          "v": 102,
          "dist": 49.37
        },
        {
          "u": 102,
          "v": 103,
          "dist": 50.1
        },
        {
          "u": 103,
          "v": 104,
          "dist": 43.44
        },
        {
          "u": 103,
          "v": 107,
          "dist": 47.71
        },
        {
          "u": 104,
          "v": 105,
          "dist": 43.29
        },
        {
          "u": 105,
          "v": 106,
          "dist": 87.57
        },
        {
          "u": 106,
          "v": 135,
          "dist": 9.32
        },
        {
          "u": 107,
          "v": 108,
          "dist": 47.38
        },
        {
          "u": 109,
          "v": 127,
          "dist": 6.93
        },
        {
          "u": 109,
          "v": 128,
          "dist": 83.86
        },
        {
          "u": 110,
          "v": 111,
          "dist": 59.41
        },
        {
          "u": 111,
          "v": 112,
          "dist": 30.15
        },
        {
          "u": 112,
          "v": 113,
          "dist": 30.15
        },
        {
          "u": 113,
          "v": 114,
          "dist": 30.15
        },
        {
          "u": 115,
          "v": 116,
          "dist": 56.32
        },
        {
          "u": 116,
          "v": 117,
          "dist": 55.33
        },
        {
          "u": 117,
          "v": 118,
          "dist": 56.32
        },
        {
          "u": 119,
          "v": 120,
          "dist": 56.32
        },
        {
          "u": 120,
          "v": 121,
          "dist": 55.33
        },
        {
          "u": 121,
          "v": 122,
          "dist": 56.32
        },
        {
          "u": 122,
          "v": 123,
          "dist": 55.44
        },
        {
          "u": 123,
          "v": 124,
          "dist": 43.74
        },
        {
          "u": 124,
          "v": 125,
          "dist": 90.55
        },
        {
          "u": 125,
          "v": 126,
          "dist": 45.28
        },
        {
          "u": 126,
          "v": 127,
          "dist": 45.28
        },
        {
          "u": 128,
          "v": 129,
          "dist": 90.55
        },
        {
          "u": 130,
          "v": 131,
          "dist": 50.25
        },
        {
          "u": 131,
          "v": 132,
          "dist": 50.25
        },
        {
          "u": 132,
          "v": 133,
          "dist": 50.25
        },
        {
          "u": 133,
          "v": 134,
          "dist": 50.25
        }
      ],
      "rooms": [
        {
          "id": "f2_room_nanosciences",
          "name": "N-207",
          "code": "ACN",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 786.5,
          "cy": 360.0,
          "entryX": 852.8,
          "entryY": 351.9,
          "node": 81,
          "isStairs": false
        },
        {
          "id": "f2_room_special_hall",
          "name": "A-208",
          "code": "SPH-102",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 382.5,
          "cy": 627.0,
          "entryX": 481.8,
          "entryY": 616.1,
          "node": 4,
          "isStairs": false
        },
        {
          "id": "f2_room_gad_office",
          "name": "A-207",
          "code": "GAD-103",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 415.5,
          "cy": 702.0,
          "entryX": 490.3,
          "entryY": 693.9,
          "node": 6,
          "isStairs": false
        },
        {
          "id": "f2_room_admin_block_a",
          "name": "A-204",
          "code": "ADM-BLK-A",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 384.0,
          "cy": 832.5,
          "entryX": 504.1,
          "entryY": 819.3,
          "node": 10,
          "isStairs": false
        },
        {
          "id": "f2_room_admission_office",
          "name": "N-201",
          "code": "ADM-105",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 668.0,
          "cy": 661.5,
          "entryX": 675.1,
          "entryY": 717.3,
          "node": 20,
          "isStairs": false
        },
        {
          "id": "f2_room_cir_seminar",
          "name": "N-203",
          "code": "CIR-106",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 861.5,
          "cy": 638.5,
          "entryX": 867.5,
          "entryY": 694.8,
          "node": 24,
          "isStairs": false
        },
        {
          "id": "f2_room_guest_room",
          "name": "S-201",
          "code": "GST-107",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 700.5,
          "cy": 937.5,
          "entryX": 694.0,
          "entryY": 886.3,
          "node": 43,
          "isStairs": false
        },
        {
          "id": "f2_room_mini_conf",
          "name": "A-205",
          "code": "CONF-MINI",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 443.5,
          "cy": 954.0,
          "entryX": 518.1,
          "entryY": 945.7,
          "node": 14,
          "isStairs": false
        },
        {
          "id": "f2_room_main_conf",
          "name": "A-203",
          "code": "CONF-MAIN",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 433.5,
          "cy": 1031.5,
          "entryX": 526.4,
          "entryY": 1021.2,
          "node": 16,
          "isStairs": false
        },
        {
          "id": "f2_room_acharya_hall",
          "name": "A-202",
          "code": "ACH-110",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 606.5,
          "cy": 1157.0,
          "entryX": 598.3,
          "entryY": 1087.6,
          "node": 110,
          "isStairs": false
        },
        {
          "id": "f2_room_stationery",
          "name": "A-201",
          "code": "STN-111",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 827.0,
          "cy": 1138.5,
          "entryX": 819.4,
          "entryY": 1067.5,
          "node": 115,
          "isStairs": false
        },
        {
          "id": "f2_room_mfg_lab",
          "name": "S-205",
          "code": "LAB-MFG",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 958.0,
          "cy": 1125.5,
          "entryX": 950.3,
          "entryY": 1053.4,
          "node": 118,
          "isStairs": false
        },
        {
          "id": "f2_room_mat_testing",
          "name": "S-206",
          "code": "LAB-MTL",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1102.5,
          "cy": 1110.5,
          "entryX": 1094.5,
          "entryY": 1036.8,
          "node": 120,
          "isStairs": false
        },
        {
          "id": "f2_room_wireless_ctr",
          "name": "N-208",
          "code": "ACWNA",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1015.5,
          "cy": 473.0,
          "entryX": 949.8,
          "entryY": 479.6,
          "node": 96,
          "isStairs": false
        },
        {
          "id": "f2_room_north_wing",
          "name": "North Corridor Wing",
          "code": "CORR-N",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 890.0,
          "cy": 330.0,
          "entryX": 850.7,
          "entryY": 333.8,
          "node": 81,
          "isStairs": false
        },
        {
          "id": "f2_room_director_dean",
          "name": "S-210",
          "code": "DIR-OFFICE",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1184.5,
          "cy": 885.0,
          "entryX": 1178.6,
          "entryY": 830.8,
          "node": 53,
          "isStairs": false
        },
        {
          "id": "f2_room_ladies_infirmary",
          "name": "S-212",
          "code": "INF-118",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1345.0,
          "cy": 866.0,
          "entryX": 1338.2,
          "entryY": 811.8,
          "node": 57,
          "isStairs": false
        },
        {
          "id": "f2_room_metallurgy",
          "name": "N-218",
          "code": "LAB-MET",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1239.5,
          "cy": 386.5,
          "entryX": 1248.2,
          "entryY": 457.3,
          "node": 100,
          "isStairs": false
        },
        {
          "id": "f2_room_fluid_mech",
          "name": "N-220 / N-219",
          "code": "LAB-FML",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1339.5,
          "cy": 374.0,
          "entryX": 1348.3,
          "entryY": 446.1,
          "node": 102,
          "isStairs": false
        },
        {
          "id": "f2_room_cae_cell",
          "name": "N-221",
          "code": "CAE-121",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1434.0,
          "cy": 363.5,
          "entryX": 1441.7,
          "entryY": 435.9,
          "node": 104,
          "isStairs": false
        },
        {
          "id": "f2_room_dynamics_lab",
          "name": "N-220",
          "code": "LAB-MDL",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1498.5,
          "cy": 355.5,
          "entryX": 1506.9,
          "entryY": 428.4,
          "node": 105,
          "isStairs": false
        },
        {
          "id": "f2_room_math_dept",
          "name": "N-222",
          "code": "MATH-DEPT",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1522.5,
          "cy": 563.5,
          "entryX": 1529.4,
          "entryY": 619.7,
          "node": 35,
          "isStairs": false
        },
        {
          "id": "f2_room_elec_machines",
          "name": "N-223",
          "code": "LAB-EML",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1745.5,
          "cy": 528.0,
          "entryX": 1753.7,
          "entryY": 592.7,
          "node": 38,
          "isStairs": false
        },
        {
          "id": "f2_room_prayer_hall",
          "name": "N-225",
          "code": "PRY-125",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1907.5,
          "cy": 509.5,
          "entryX": 1914.9,
          "entryY": 573.4,
          "node": 40,
          "isStairs": false
        },
        {
          "id": "f2_room_college_admin",
          "name": "S-216",
          "code": "CADM-127",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1554.5,
          "cy": 844.0,
          "entryX": 1547.8,
          "entryY": 788.9,
          "node": 61,
          "isStairs": false
        },
        {
          "id": "f2_room_computer_lab",
          "name": "S-220 / S-219 / S-218 / S-217",
          "code": "LAB-CS",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1754.5,
          "cy": 833.5,
          "entryX": 1746.6,
          "entryY": 765.4,
          "node": 64,
          "isStairs": false
        },
        {
          "id": "f2_room_mech_workshop",
          "name": "S-203",
          "code": "LAB-MECH",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1351.0,
          "cy": 1074.5,
          "entryX": 1343.3,
          "entryY": 1005.3,
          "node": 125,
          "isStairs": false
        },
        {
          "id": "f2_room_robotics_lab",
          "name": "S-202",
          "code": "LAB-ROBO",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1448.5,
          "cy": 1063.0,
          "entryX": 1440.9,
          "entryY": 994.5,
          "node": 127,
          "isStairs": false
        },
        {
          "id": "f2_room_wind_tunnel",
          "name": "S-214",
          "code": "LAB-WIND",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1547.5,
          "cy": 1052.5,
          "entryX": 1538.4,
          "entryY": 983.9,
          "node": 128,
          "isStairs": false
        },
        {
          "id": "f2_room_1790266501061",
          "name": "N-209",
          "code": "LAB-FLUID",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1007.5,
          "cy": 388.5,
          "entryX": 940.4,
          "entryY": 395.0,
          "node": 94,
          "isStairs": false
        },
        {
          "id": "f2_room_1790266683270",
          "name": "N-210",
          "code": "R-136",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 991.0,
          "cy": 254.0,
          "entryX": 925.8,
          "entryY": 261.9,
          "node": 89,
          "isStairs": false
        },
        {
          "id": "f2_room_1790267011208",
          "name": "S-211",
          "code": "Arts and Science",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1281.0,
          "cy": 874.5,
          "entryX": 1274.8,
          "entryY": 819.1,
          "node": 55,
          "isStairs": false
        },
        {
          "id": "f2_room_1790267197118",
          "name": "S-212",
          "code": "Conference",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1394.5,
          "cy": 861.5,
          "entryX": 1388.5,
          "entryY": 806.5,
          "node": 59,
          "isStairs": false
        },
        {
          "id": "f2_room_1790267337608",
          "name": "S-202",
          "code": "AUMS",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 797.0,
          "cy": 927.5,
          "entryX": 791.4,
          "entryY": 875.1,
          "node": 45,
          "isStairs": false
        },
        {
          "id": "f2_room_1790267611764",
          "name": "A-210",
          "code": "AMH-101",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 531.5,
          "cy": 464.0,
          "entryX": 538.5,
          "entryY": 534.1,
          "node": 131,
          "isStairs": false
        },
        {
          "id": "f2_room_1790267932589",
          "name": "N-215",
          "code": "SA",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1152.0,
          "cy": 604.5,
          "entryX": 1158.2,
          "entryY": 662.0,
          "node": 29,
          "isStairs": false
        },
        {
          "id": "f2_room_1790267966500",
          "name": "N-216",
          "code": "",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1249.0,
          "cy": 592.5,
          "entryX": 1255.5,
          "entryY": 651.2,
          "node": 31,
          "isStairs": false
        },
        {
          "id": "f2_room_1790268001235",
          "name": "N-217",
          "code": "",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1343.0,
          "cy": 580.5,
          "entryX": 1349.5,
          "entryY": 639.8,
          "node": 33,
          "isStairs": false
        },
        {
          "id": "f2_room_1790500434656",
          "name": "S-206",
          "code": "R-145",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1056.5,
          "cy": 900.0,
          "entryX": 1050.5,
          "entryY": 844.8,
          "node": 50,
          "isStairs": false
        },
        {
          "id": "f2_room_1790500485062",
          "name": "S-203",
          "code": "R-146",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 898.0,
          "cy": 916.0,
          "entryX": 892.3,
          "entryY": 863.1,
          "node": 47,
          "isStairs": false
        },
        {
          "id": "f2_room_1790500552707",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 570.5,
          "cy": 942.5,
          "entryX": 566.0,
          "entryY": 900.3,
          "node": 12,
          "isStairs": true,
          "stairColId": "STAIR-SW"
        },
        {
          "id": "f2_room_1790500614032",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 542.5,
          "cy": 688.5,
          "entryX": 546.4,
          "entryY": 729.9,
          "node": 8,
          "isStairs": true,
          "stairColId": "STAIR-NW"
        },
        {
          "id": "f2_room_1790500619454",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 988.0,
          "cy": 765.0,
          "entryX": 949.0,
          "entryY": 769.6,
          "node": 68,
          "isStairs": true,
          "stairColId": "STAIR-CTR"
        },
        {
          "id": "f2_room_1790500625267",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 889.0,
          "cy": 320.5,
          "entryX": 849.8,
          "entryY": 324.3,
          "node": 81,
          "isStairs": true,
          "stairColId": "STAIR-N"
        },
        {
          "id": "f2_room_1790500631547",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1661.0,
          "cy": 691.5,
          "entryX": 1619.3,
          "entryY": 696.4,
          "node": 74,
          "isStairs": true,
          "stairColId": "STAIR-E"
        },
        {
          "id": "f2_room_1790500639780",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 922.5,
          "cy": 990.5,
          "entryX": 973.0,
          "entryY": 984.2,
          "node": 70,
          "isStairs": true,
          "stairColId": "STAIR-CS"
        },
        {
          "id": "f2_room_1790500650489",
          "name": "Stairs",
          "code": "R-147",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1361.5,
          "cy": 491.5,
          "entryX": 1355.8,
          "entryY": 445.1,
          "node": 102,
          "isStairs": true,
          "stairColId": "STAIR-NE"
        },
        {
          "id": "f2_room_1790500850398",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 869.5,
          "cy": 117.5,
          "entryX": 871.5,
          "entryY": 158.4,
          "node": 98,
          "isStairs": false
        },
        {
          "id": "f2_room_1790500900853",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1676.5,
          "cy": 1056.0,
          "entryX": 1657.0,
          "entryY": 1024.0,
          "node": 76,
          "isStairs": false
        },
        {
          "id": "f2_room_1790500984653",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1210.5,
          "cy": 1079.5,
          "entryX": 1203.5,
          "entryY": 1024.6,
          "node": 122,
          "isStairs": false
        },
        {
          "id": "f2_room_1790501046808",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1594.0,
          "cy": 324.0,
          "entryX": 1583.0,
          "entryY": 359.0,
          "node": 73,
          "isStairs": false
        },
        {
          "id": "f2_room_1790501831784",
          "name": "N-202",
          "code": "ADM-105",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 766.5,
          "cy": 650.5,
          "entryX": 773.6,
          "entryY": 705.9,
          "node": 22,
          "isStairs": false
        },
        {
          "id": "f2_room_1790501909379",
          "name": "N-214",
          "code": "R-155",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1007.0,
          "cy": 624.5,
          "entryX": 1012.9,
          "entryY": 677.9,
          "node": 27,
          "isStairs": false
        },
        {
          "id": "f2_room_1790502692180",
          "name": "Microwave Lab",
          "code": "R-155",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 1928.5,
          "cy": 812.5,
          "entryX": 1920.8,
          "entryY": 745.3,
          "node": 66,
          "isStairs": false
        },
        {
          "id": "f2_room_1790520116929",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 486.0,
          "cy": 1092.5,
          "entryX": 533.7,
          "entryY": 1087.2,
          "node": 17,
          "isStairs": false
        },
        {
          "id": "f2_room_1790520135835",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "second",
          "floorIdx": 2,
          "floorTitle": "Second Floor",
          "cx": 425.5,
          "cy": 553.5,
          "entryX": 474.2,
          "entryY": 548.1,
          "node": 2,
          "isStairs": false
        }
      ],
      "stairs": {
        "STAIR-NW": {
          "colId": "STAIR-NW",
          "colName": "North-West Stairs (Near Reception / CAD)",
          "roomId": "f2_room_1790500614032",
          "node": 8,
          "entryX": 546.4,
          "entryY": 729.9,
          "cx": 542.5,
          "cy": 688.5
        },
        "STAIR-SW": {
          "colId": "STAIR-SW",
          "colName": "South-West Stairs (Near Acharya / Conf)",
          "roomId": "f2_room_1790500552707",
          "node": 12,
          "entryX": 566.0,
          "entryY": 900.3,
          "cx": 570.5,
          "cy": 942.5
        },
        "STAIR-N": {
          "colId": "STAIR-N",
          "colName": "North Wing Stairs (Near Physics / Chem)",
          "roomId": "f2_room_1790500625267",
          "node": 81,
          "entryX": 849.8,
          "entryY": 324.3,
          "cx": 889.0,
          "cy": 320.5
        },
        "STAIR-CS": {
          "colId": "STAIR-CS",
          "colName": "Central-South Stairs (Near Courtyard)",
          "roomId": "f2_room_1790500639780",
          "node": 70,
          "entryX": 973.0,
          "entryY": 984.2,
          "cx": 922.5,
          "cy": 990.5
        },
        "STAIR-CTR": {
          "colId": "STAIR-CTR",
          "colName": "Central Spine Stairs (Main Axis)",
          "roomId": "f2_room_1790500619454",
          "node": 68,
          "entryX": 949.0,
          "entryY": 769.6,
          "cx": 988.0,
          "cy": 765.0
        },
        "STAIR-NE": {
          "colId": "STAIR-NE",
          "colName": "North-East Stairs (Engineering / Staff)",
          "roomId": "f2_room_1790500650489",
          "node": 102,
          "entryX": 1355.8,
          "entryY": 445.1,
          "cx": 1361.5,
          "cy": 491.5
        },
        "STAIR-E": {
          "colId": "STAIR-E",
          "colName": "East Wing Stairs (Near Computer Labs)",
          "roomId": "f2_room_1790500631547",
          "node": 74,
          "entryX": 1619.3,
          "entryY": 696.4,
          "cx": 1661.0,
          "cy": 691.5
        }
      }
    },
    "third": {
      "floor": "third",
      "floorIdx": 3,
      "title": "Third Floor",
      "nodes": [
        [
          472.0,
          527.0
        ],
        [
          473.0,
          537.0
        ],
        [
          474.0,
          546.0
        ],
        [
          476.0,
          564.0
        ],
        [
          480.0,
          600.0
        ],
        [
          488.0,
          673.0
        ],
        [
          492.0,
          710.0
        ],
        [
          494.0,
          728.0
        ],
        [
          494.75,
          734.72
        ],
        [
          496.0,
          746.0
        ],
        [
          504.0,
          818.0
        ],
        [
          512.0,
          891.0
        ],
        [
          513.65,
          905.88
        ],
        [
          516.0,
          927.0
        ],
        [
          518.0,
          945.0
        ],
        [
          520.0,
          963.0
        ],
        [
          524.0,
          1000.0
        ],
        [
          534.5,
          1094.53
        ],
        [
          535.0,
          1099.0
        ],
        [
          536.0,
          1108.0
        ],
        [
          662.0,
          719.0
        ],
        [
          717.0,
          712.0
        ],
        [
          773.0,
          706.0
        ],
        [
          828.0,
          699.0
        ],
        [
          884.0,
          693.0
        ],
        [
          939.0,
          686.0
        ],
        [
          1030.0,
          676.0
        ],
        [
          1121.0,
          666.0
        ],
        [
          1212.0,
          656.0
        ],
        [
          1257.0,
          651.0
        ],
        [
          1302.0,
          645.0
        ],
        [
          1366.0,
          638.0
        ],
        [
          1429.0,
          631.0
        ],
        [
          1519.0,
          621.0
        ],
        [
          1609.0,
          610.0
        ],
        [
          1692.0,
          603.0
        ],
        [
          1775.0,
          595.0
        ],
        [
          1858.0,
          588.0
        ],
        [
          1940.0,
          580.0
        ],
        [
          625.0,
          893.0
        ],
        [
          681.0,
          887.0
        ],
        [
          736.0,
          881.0
        ],
        [
          792.0,
          875.0
        ],
        [
          847.0,
          868.0
        ],
        [
          902.0,
          862.0
        ],
        [
          957.98,
          855.25
        ],
        [
          1049.0,
          845.0
        ],
        [
          1186.0,
          830.0
        ],
        [
          1276.0,
          819.0
        ],
        [
          1321.13,
          813.88
        ],
        [
          1384.0,
          807.0
        ],
        [
          1447.81,
          799.44
        ],
        [
          1538.0,
          789.0
        ],
        [
          1628.64,
          778.84
        ],
        [
          1707.0,
          770.0
        ],
        [
          1785.0,
          761.0
        ],
        [
          1863.0,
          752.0
        ],
        [
          1902.0,
          748.0
        ],
        [
          1940.62,
          743.29
        ],
        [
          917.0,
          495.0
        ],
        [
          949.0,
          770.0
        ],
        [
          969.0,
          952.0
        ],
        [
          972.0,
          976.0
        ],
        [
          975.0,
          1000.0
        ],
        [
          980.0,
          1048.0
        ],
        [
          1311.0,
          728.0
        ],
        [
          1583.0,
          359.0
        ],
        [
          1589.66,
          418.93
        ],
        [
          1596.0,
          484.0
        ],
        [
          1619.0,
          694.0
        ],
        [
          1660.0,
          1020.0
        ],
        [
          832.04,
          173.93
        ],
        [
          842.0,
          255.0
        ],
        [
          847.0,
          296.0
        ],
        [
          851.0,
          337.0
        ],
        [
          856.0,
          378.0
        ],
        [
          860.0,
          419.0
        ],
        [
          865.0,
          460.0
        ],
        [
          869.28,
          500.81
        ],
        [
          913.51,
          164.65
        ],
        [
          918.0,
          205.0
        ],
        [
          923.0,
          246.0
        ],
        [
          932.0,
          328.0
        ],
        [
          937.0,
          369.0
        ],
        [
          941.0,
          410.0
        ],
        [
          946.0,
          451.0
        ],
        [
          950.75,
          491.53
        ],
        [
          872.77,
          169.29
        ],
        [
          871.53,
          158.36
        ],
        [
          1210.08,
          461.99
        ],
        [
          1259.0,
          456.0
        ],
        [
          1308.0,
          451.0
        ],
        [
          1406.8,
          439.57
        ],
        [
          1450.0,
          435.0
        ],
        [
          1493.0,
          430.0
        ],
        [
          1515.0,
          428.0
        ],
        [
          1537.0,
          425.0
        ],
        [
          1580.0,
          420.0
        ],
        [
          1412.0,
          487.0
        ],
        [
          1418.0,
          534.0
        ],
        [
          1469.86,
          992.99
        ],
        [
          595.0,
          1088.0
        ],
        [
          654.0,
          1081.0
        ],
        [
          684.0,
          1078.0
        ],
        [
          714.0,
          1075.0
        ],
        [
          744.0,
          1072.0
        ],
        [
          802.0,
          1084.0
        ],
        [
          858.0,
          1078.0
        ],
        [
          913.0,
          1072.0
        ],
        [
          969.0,
          1066.0
        ],
        [
          982.08,
          1064.34
        ],
        [
          1024.0,
          1059.0
        ],
        [
          1080.0,
          1053.0
        ],
        [
          1135.0,
          1047.0
        ],
        [
          1246.0,
          1034.0
        ],
        [
          1280.0,
          1020.0
        ],
        [
          1560.0,
          980.0
        ],
        [
          480.0,
          540.0
        ],
        [
          530.0,
          535.0
        ],
        [
          580.0,
          530.0
        ],
        [
          630.0,
          525.0
        ],
        [
          680.0,
          520.0
        ]
      ],
      "edges": [
        {
          "u": 0,
          "v": 1,
          "dist": 10.05
        },
        {
          "u": 0,
          "v": 117,
          "dist": 15.26
        },
        {
          "u": 1,
          "v": 2,
          "dist": 9.06
        },
        {
          "u": 2,
          "v": 3,
          "dist": 18.11
        },
        {
          "u": 3,
          "v": 4,
          "dist": 36.22
        },
        {
          "u": 4,
          "v": 5,
          "dist": 73.44
        },
        {
          "u": 5,
          "v": 6,
          "dist": 37.22
        },
        {
          "u": 6,
          "v": 7,
          "dist": 18.11
        },
        {
          "u": 7,
          "v": 8,
          "dist": 6.76
        },
        {
          "u": 8,
          "v": 9,
          "dist": 11.35
        },
        {
          "u": 8,
          "v": 20,
          "dist": 167.99
        },
        {
          "u": 9,
          "v": 10,
          "dist": 72.44
        },
        {
          "u": 10,
          "v": 11,
          "dist": 73.44
        },
        {
          "u": 11,
          "v": 12,
          "dist": 14.97
        },
        {
          "u": 12,
          "v": 13,
          "dist": 21.25
        },
        {
          "u": 12,
          "v": 39,
          "dist": 112.09
        },
        {
          "u": 13,
          "v": 14,
          "dist": 18.11
        },
        {
          "u": 14,
          "v": 15,
          "dist": 18.11
        },
        {
          "u": 15,
          "v": 16,
          "dist": 37.22
        },
        {
          "u": 16,
          "v": 17,
          "dist": 95.11
        },
        {
          "u": 17,
          "v": 18,
          "dist": 4.5
        },
        {
          "u": 17,
          "v": 101,
          "dist": 60.85
        },
        {
          "u": 18,
          "v": 19,
          "dist": 9.06
        },
        {
          "u": 20,
          "v": 21,
          "dist": 55.44
        },
        {
          "u": 21,
          "v": 22,
          "dist": 56.32
        },
        {
          "u": 22,
          "v": 23,
          "dist": 55.44
        },
        {
          "u": 23,
          "v": 24,
          "dist": 56.32
        },
        {
          "u": 24,
          "v": 25,
          "dist": 55.44
        },
        {
          "u": 25,
          "v": 26,
          "dist": 91.55
        },
        {
          "u": 25,
          "v": 59,
          "dist": 192.26
        },
        {
          "u": 25,
          "v": 60,
          "dist": 84.59
        },
        {
          "u": 26,
          "v": 27,
          "dist": 91.55
        },
        {
          "u": 27,
          "v": 28,
          "dist": 91.55
        },
        {
          "u": 28,
          "v": 29,
          "dist": 45.28
        },
        {
          "u": 29,
          "v": 30,
          "dist": 45.4
        },
        {
          "u": 30,
          "v": 31,
          "dist": 64.38
        },
        {
          "u": 30,
          "v": 65,
          "dist": 83.49
        },
        {
          "u": 31,
          "v": 32,
          "dist": 63.39
        },
        {
          "u": 32,
          "v": 33,
          "dist": 90.55
        },
        {
          "u": 32,
          "v": 99,
          "dist": 97.62
        },
        {
          "u": 33,
          "v": 34,
          "dist": 90.67
        },
        {
          "u": 34,
          "v": 35,
          "dist": 83.29
        },
        {
          "u": 34,
          "v": 68,
          "dist": 126.67
        },
        {
          "u": 34,
          "v": 69,
          "dist": 84.59
        },
        {
          "u": 35,
          "v": 36,
          "dist": 83.38
        },
        {
          "u": 36,
          "v": 37,
          "dist": 83.29
        },
        {
          "u": 37,
          "v": 38,
          "dist": 82.39
        },
        {
          "u": 39,
          "v": 40,
          "dist": 56.32
        },
        {
          "u": 40,
          "v": 41,
          "dist": 55.33
        },
        {
          "u": 41,
          "v": 42,
          "dist": 56.32
        },
        {
          "u": 42,
          "v": 43,
          "dist": 55.44
        },
        {
          "u": 43,
          "v": 44,
          "dist": 55.33
        },
        {
          "u": 44,
          "v": 45,
          "dist": 56.39
        },
        {
          "u": 45,
          "v": 46,
          "dist": 91.6
        },
        {
          "u": 45,
          "v": 60,
          "dist": 85.72
        },
        {
          "u": 45,
          "v": 61,
          "dist": 97.38
        },
        {
          "u": 46,
          "v": 47,
          "dist": 137.82
        },
        {
          "u": 47,
          "v": 48,
          "dist": 90.67
        },
        {
          "u": 48,
          "v": 49,
          "dist": 45.42
        },
        {
          "u": 49,
          "v": 50,
          "dist": 63.25
        },
        {
          "u": 49,
          "v": 65,
          "dist": 86.48
        },
        {
          "u": 50,
          "v": 51,
          "dist": 64.26
        },
        {
          "u": 51,
          "v": 52,
          "dist": 90.79
        },
        {
          "u": 51,
          "v": 100,
          "dist": 194.8
        },
        {
          "u": 52,
          "v": 53,
          "dist": 91.21
        },
        {
          "u": 53,
          "v": 54,
          "dist": 78.86
        },
        {
          "u": 53,
          "v": 69,
          "dist": 85.39
        },
        {
          "u": 53,
          "v": 70,
          "dist": 243.19
        },
        {
          "u": 54,
          "v": 55,
          "dist": 78.52
        },
        {
          "u": 55,
          "v": 56,
          "dist": 78.52
        },
        {
          "u": 56,
          "v": 57,
          "dist": 39.2
        },
        {
          "u": 57,
          "v": 58,
          "dist": 38.91
        },
        {
          "u": 59,
          "v": 78,
          "dist": 48.07
        },
        {
          "u": 59,
          "v": 86,
          "dist": 33.93
        },
        {
          "u": 61,
          "v": 62,
          "dist": 24.19
        },
        {
          "u": 62,
          "v": 63,
          "dist": 24.19
        },
        {
          "u": 63,
          "v": 64,
          "dist": 48.26
        },
        {
          "u": 64,
          "v": 110,
          "dist": 16.47
        },
        {
          "u": 66,
          "v": 67,
          "dist": 60.3
        },
        {
          "u": 67,
          "v": 68,
          "dist": 65.38
        },
        {
          "u": 67,
          "v": 97,
          "dist": 9.72
        },
        {
          "u": 71,
          "v": 72,
          "dist": 81.68
        },
        {
          "u": 71,
          "v": 87,
          "dist": 40.99
        },
        {
          "u": 72,
          "v": 73,
          "dist": 41.3
        },
        {
          "u": 73,
          "v": 74,
          "dist": 41.19
        },
        {
          "u": 74,
          "v": 75,
          "dist": 41.3
        },
        {
          "u": 75,
          "v": 76,
          "dist": 41.19
        },
        {
          "u": 76,
          "v": 77,
          "dist": 41.3
        },
        {
          "u": 77,
          "v": 78,
          "dist": 41.03
        },
        {
          "u": 79,
          "v": 80,
          "dist": 40.6
        },
        {
          "u": 79,
          "v": 87,
          "dist": 41.0
        },
        {
          "u": 80,
          "v": 81,
          "dist": 41.3
        },
        {
          "u": 81,
          "v": 82,
          "dist": 82.49
        },
        {
          "u": 82,
          "v": 83,
          "dist": 41.3
        },
        {
          "u": 83,
          "v": 84,
          "dist": 41.19
        },
        {
          "u": 84,
          "v": 85,
          "dist": 41.3
        },
        {
          "u": 85,
          "v": 86,
          "dist": 40.81
        },
        {
          "u": 87,
          "v": 88,
          "dist": 11.0
        },
        {
          "u": 89,
          "v": 90,
          "dist": 49.29
        },
        {
          "u": 90,
          "v": 91,
          "dist": 49.25
        },
        {
          "u": 91,
          "v": 92,
          "dist": 99.46
        },
        {
          "u": 92,
          "v": 93,
          "dist": 43.44
        },
        {
          "u": 92,
          "v": 98,
          "dist": 47.71
        },
        {
          "u": 93,
          "v": 94,
          "dist": 43.29
        },
        {
          "u": 94,
          "v": 95,
          "dist": 22.09
        },
        {
          "u": 95,
          "v": 96,
          "dist": 22.2
        },
        {
          "u": 96,
          "v": 97,
          "dist": 43.29
        },
        {
          "u": 98,
          "v": 99,
          "dist": 47.38
        },
        {
          "u": 100,
          "v": 115,
          "dist": 191.77
        },
        {
          "u": 100,
          "v": 116,
          "dist": 91.07
        },
        {
          "u": 101,
          "v": 102,
          "dist": 59.41
        },
        {
          "u": 102,
          "v": 103,
          "dist": 30.15
        },
        {
          "u": 103,
          "v": 104,
          "dist": 30.15
        },
        {
          "u": 104,
          "v": 105,
          "dist": 30.15
        },
        {
          "u": 106,
          "v": 107,
          "dist": 56.32
        },
        {
          "u": 107,
          "v": 108,
          "dist": 55.33
        },
        {
          "u": 108,
          "v": 109,
          "dist": 56.32
        },
        {
          "u": 109,
          "v": 110,
          "dist": 13.18
        },
        {
          "u": 110,
          "v": 111,
          "dist": 42.26
        },
        {
          "u": 111,
          "v": 112,
          "dist": 56.32
        },
        {
          "u": 112,
          "v": 113,
          "dist": 55.33
        },
        {
          "u": 113,
          "v": 114,
          "dist": 111.76
        },
        {
          "u": 114,
          "v": 115,
          "dist": 36.77
        },
        {
          "u": 117,
          "v": 118,
          "dist": 50.25
        },
        {
          "u": 118,
          "v": 119,
          "dist": 50.25
        },
        {
          "u": 119,
          "v": 120,
          "dist": 50.25
        },
        {
          "u": 120,
          "v": 121,
          "dist": 50.25
        }
      ],
      "rooms": [
        {
          "id": "f3_room_nanosciences",
          "name": "N-306",
          "code": "ACN",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 786.5,
          "cy": 360.0,
          "entryX": 852.8,
          "entryY": 351.9,
          "node": 74,
          "isStairs": false
        },
        {
          "id": "f3_room_special_hall",
          "name": "A-308",
          "code": "SPH-102",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 382.5,
          "cy": 627.0,
          "entryX": 481.8,
          "entryY": 616.1,
          "node": 4,
          "isStairs": false
        },
        {
          "id": "f3_room_gad_office",
          "name": "A-307",
          "code": "GAD-103",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 415.5,
          "cy": 702.0,
          "entryX": 490.3,
          "entryY": 693.9,
          "node": 6,
          "isStairs": false
        },
        {
          "id": "f3_room_admin_block_a",
          "name": "A-304",
          "code": "ADM-BLK-A",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 384.0,
          "cy": 832.5,
          "entryX": 504.1,
          "entryY": 819.3,
          "node": 10,
          "isStairs": false
        },
        {
          "id": "f3_room_admission_office",
          "name": "N-301",
          "code": "ADM-105",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 668.0,
          "cy": 661.5,
          "entryX": 675.1,
          "entryY": 717.3,
          "node": 20,
          "isStairs": false
        },
        {
          "id": "f3_room_cir_seminar",
          "name": "N-303",
          "code": "CIR-106",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 861.5,
          "cy": 638.5,
          "entryX": 867.5,
          "entryY": 694.8,
          "node": 24,
          "isStairs": false
        },
        {
          "id": "f3_room_guest_room",
          "name": "S-301",
          "code": "GST-107",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 700.5,
          "cy": 937.5,
          "entryX": 694.8,
          "entryY": 885.5,
          "node": 40,
          "isStairs": false
        },
        {
          "id": "f3_room_mini_conf",
          "name": "A-305",
          "code": "CONF-MINI",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 443.5,
          "cy": 954.0,
          "entryX": 518.1,
          "entryY": 945.7,
          "node": 14,
          "isStairs": false
        },
        {
          "id": "f3_room_main_conf",
          "name": "A-303",
          "code": "CONF-MAIN",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 433.5,
          "cy": 1031.5,
          "entryX": 526.4,
          "entryY": 1021.2,
          "node": 16,
          "isStairs": false
        },
        {
          "id": "f3_room_acharya_hall",
          "name": "A-302",
          "code": "ACH-110",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 606.5,
          "cy": 1157.0,
          "entryX": 598.3,
          "entryY": 1087.6,
          "node": 101,
          "isStairs": false
        },
        {
          "id": "f3_room_stationery",
          "name": "A-301",
          "code": "STN-111",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 827.0,
          "cy": 1138.5,
          "entryX": 820.9,
          "entryY": 1082.0,
          "node": 106,
          "isStairs": false
        },
        {
          "id": "f3_room_mfg_lab",
          "name": "S-305",
          "code": "LAB-MFG",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 958.0,
          "cy": 1125.5,
          "entryX": 951.8,
          "entryY": 1067.8,
          "node": 109,
          "isStairs": false
        },
        {
          "id": "f3_room_mat_testing",
          "name": "S-306",
          "code": "LAB-MTL",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1102.5,
          "cy": 1110.5,
          "entryX": 1096.0,
          "entryY": 1051.3,
          "node": 112,
          "isStairs": false
        },
        {
          "id": "f3_room_wireless_ctr",
          "name": "N-317",
          "code": "ACWNA",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1015.5,
          "cy": 473.0,
          "entryX": 949.5,
          "entryY": 480.7,
          "node": 86,
          "isStairs": false
        },
        {
          "id": "f3_room_north_wing",
          "name": "North Corridor Wing",
          "code": "CORR-N",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 890.0,
          "cy": 326.0,
          "entryX": 850.3,
          "entryY": 329.9,
          "node": 74,
          "isStairs": false
        },
        {
          "id": "f3_room_director_dean",
          "name": "S-309",
          "code": "DIR-OFFICE",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1184.5,
          "cy": 885.0,
          "entryX": 1178.6,
          "entryY": 830.8,
          "node": 47,
          "isStairs": false
        },
        {
          "id": "f3_room_ladies_infirmary",
          "name": "S-312",
          "code": "INF-118",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1345.0,
          "cy": 866.0,
          "entryX": 1339.1,
          "entryY": 811.9,
          "node": 49,
          "isStairs": false
        },
        {
          "id": "f3_room_metallurgy",
          "name": "N-319",
          "code": "LAB-MET",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1239.5,
          "cy": 386.5,
          "entryX": 1248.2,
          "entryY": 457.3,
          "node": 90,
          "isStairs": false
        },
        {
          "id": "f3_room_fluid_mech",
          "name": "N-320",
          "code": "LAB-FML",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1339.5,
          "cy": 374.0,
          "entryX": 1347.9,
          "entryY": 446.4,
          "node": 91,
          "isStairs": false
        },
        {
          "id": "f3_room_cae_cell",
          "name": "N-323",
          "code": "CAE-121",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1434.0,
          "cy": 363.5,
          "entryX": 1441.7,
          "entryY": 435.9,
          "node": 93,
          "isStairs": false
        },
        {
          "id": "f3_room_dynamics_lab",
          "name": "N-321",
          "code": "LAB-MDL",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1498.5,
          "cy": 355.5,
          "entryX": 1505.2,
          "entryY": 428.9,
          "node": 95,
          "isStairs": false
        },
        {
          "id": "f3_room_math_dept",
          "name": "N-322",
          "code": "MATH-DEPT",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1522.5,
          "cy": 563.5,
          "entryX": 1529.4,
          "entryY": 619.7,
          "node": 33,
          "isStairs": false
        },
        {
          "id": "f3_room_elec_machines",
          "name": "N-325",
          "code": "LAB-EML",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1745.5,
          "cy": 528.0,
          "entryX": 1752.2,
          "entryY": 597.2,
          "node": 36,
          "isStairs": false
        },
        {
          "id": "f3_room_prayer_hall",
          "name": "N-327",
          "code": "PRY-125",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1907.5,
          "cy": 509.5,
          "entryX": 1914.6,
          "entryY": 582.5,
          "node": 38,
          "isStairs": false
        },
        {
          "id": "f3_room_college_admin",
          "name": "S-315",
          "code": "CADM-127",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1554.5,
          "cy": 844.0,
          "entryX": 1548.2,
          "entryY": 787.9,
          "node": 52,
          "isStairs": false
        },
        {
          "id": "f3_room_computer_lab",
          "name": "S-318",
          "code": "LAB-CS",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1763.5,
          "cy": 831.5,
          "entryX": 1755.8,
          "entryY": 764.4,
          "node": 55,
          "isStairs": false
        },
        {
          "id": "f3_room_mech_workshop",
          "name": "S-311",
          "code": "LAB-MECH",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1351.0,
          "cy": 1074.5,
          "entryX": 1342.0,
          "entryY": 1011.2,
          "node": 115,
          "isStairs": false
        },
        {
          "id": "f3_room_robotics_lab",
          "name": "S-302",
          "code": "LAB-ROBO",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1448.5,
          "cy": 1063.0,
          "entryX": 1439.2,
          "entryY": 997.4,
          "node": 100,
          "isStairs": false
        },
        {
          "id": "f3_room_wind_tunnel",
          "name": "S-314",
          "code": "LAB-WIND",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1547.5,
          "cy": 1052.5,
          "entryX": 1537.5,
          "entryY": 983.2,
          "node": 116,
          "isStairs": false
        },
        {
          "id": "f3_room_1790266501061",
          "name": "N-310",
          "code": "LAB-FLUID",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1007.5,
          "cy": 388.5,
          "entryX": 939.5,
          "entryY": 395.1,
          "node": 84,
          "isStairs": false
        },
        {
          "id": "f3_room_1790266683270",
          "name": "N-309",
          "code": "R-136",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 991.0,
          "cy": 254.0,
          "entryX": 924.7,
          "entryY": 261.3,
          "node": 81,
          "isStairs": false
        },
        {
          "id": "f3_room_1790267011208",
          "name": "S-313",
          "code": "Arts and Science",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1281.0,
          "cy": 874.5,
          "entryX": 1274.2,
          "entryY": 819.2,
          "node": 48,
          "isStairs": false
        },
        {
          "id": "f3_room_1790267197118",
          "name": "S-310",
          "code": "Conference",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1394.5,
          "cy": 861.5,
          "entryX": 1388.0,
          "entryY": 806.5,
          "node": 50,
          "isStairs": false
        },
        {
          "id": "f3_room_1790267337608",
          "name": "S-302",
          "code": "AUMS",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 797.0,
          "cy": 927.5,
          "entryX": 791.4,
          "entryY": 875.1,
          "node": 42,
          "isStairs": false
        },
        {
          "id": "f3_room_1790267611764",
          "name": "A-304/2",
          "code": "AMH-101",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 531.5,
          "cy": 464.0,
          "entryX": 538.5,
          "entryY": 534.1,
          "node": 118,
          "isStairs": false
        },
        {
          "id": "f3_room_1790267932589",
          "name": "N-315",
          "code": "SA",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1152.0,
          "cy": 604.5,
          "entryX": 1158.3,
          "entryY": 661.9,
          "node": 27,
          "isStairs": false
        },
        {
          "id": "f3_room_1790267966500",
          "name": "N-316",
          "code": "",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1249.0,
          "cy": 592.5,
          "entryX": 1255.5,
          "entryY": 651.2,
          "node": 29,
          "isStairs": false
        },
        {
          "id": "f3_room_1790268001235",
          "name": "N-318",
          "code": "",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1343.0,
          "cy": 580.5,
          "entryX": 1349.5,
          "entryY": 639.8,
          "node": 31,
          "isStairs": false
        },
        {
          "id": "f3_room_1790500434656",
          "name": "S-307",
          "code": "R-145",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1056.5,
          "cy": 900.0,
          "entryX": 1050.5,
          "entryY": 844.8,
          "node": 46,
          "isStairs": false
        },
        {
          "id": "f3_room_1790500485062",
          "name": "S-303",
          "code": "R-146",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 898.0,
          "cy": 916.0,
          "entryX": 892.2,
          "entryY": 863.1,
          "node": 44,
          "isStairs": false
        },
        {
          "id": "f3_room_1790500552707",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 570.5,
          "cy": 942.5,
          "entryX": 565.6,
          "entryY": 899.9,
          "node": 12,
          "isStairs": true,
          "stairColId": "STAIR-SW"
        },
        {
          "id": "f3_room_1790500614032",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 542.5,
          "cy": 688.5,
          "entryX": 546.4,
          "entryY": 729.9,
          "node": 8,
          "isStairs": true,
          "stairColId": "STAIR-NW"
        },
        {
          "id": "f3_room_1790500619454",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 988.0,
          "cy": 765.0,
          "entryX": 949.0,
          "entryY": 769.6,
          "node": 60,
          "isStairs": true,
          "stairColId": "STAIR-CTR"
        },
        {
          "id": "f3_room_1790500625267",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 889.0,
          "cy": 320.5,
          "entryX": 849.8,
          "entryY": 324.3,
          "node": 74,
          "isStairs": true,
          "stairColId": "STAIR-N"
        },
        {
          "id": "f3_room_1790500631547",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1661.0,
          "cy": 691.5,
          "entryX": 1619.3,
          "entryY": 696.2,
          "node": 69,
          "isStairs": true,
          "stairColId": "STAIR-E"
        },
        {
          "id": "f3_room_1790500639780",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 922.5,
          "cy": 990.5,
          "entryX": 973.0,
          "entryY": 984.2,
          "node": 62,
          "isStairs": true,
          "stairColId": "STAIR-CS"
        },
        {
          "id": "f3_room_1790500650489",
          "name": "Stairs",
          "code": "R-147",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1361.5,
          "cy": 491.5,
          "entryX": 1356.2,
          "entryY": 445.4,
          "node": 91,
          "isStairs": true,
          "stairColId": "STAIR-NE"
        },
        {
          "id": "f3_room_1790500850398",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 869.5,
          "cy": 117.5,
          "entryX": 871.5,
          "entryY": 158.4,
          "node": 88,
          "isStairs": false
        },
        {
          "id": "f3_room_1790500900853",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1676.5,
          "cy": 1056.0,
          "entryX": 1660.0,
          "entryY": 1020.0,
          "node": 70,
          "isStairs": false
        },
        {
          "id": "f3_room_1790500984653",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1210.5,
          "cy": 1079.5,
          "entryX": 1205.7,
          "entryY": 1038.7,
          "node": 114,
          "isStairs": false
        },
        {
          "id": "f3_room_1790501046808",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1594.0,
          "cy": 324.0,
          "entryX": 1583.0,
          "entryY": 359.0,
          "node": 66,
          "isStairs": false
        },
        {
          "id": "f3_room_1790501831784",
          "name": "N-302",
          "code": "ADM-105",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 766.5,
          "cy": 650.5,
          "entryX": 773.6,
          "entryY": 705.9,
          "node": 22,
          "isStairs": false
        },
        {
          "id": "f3_room_1790501909379",
          "name": "N-314",
          "code": "R-155",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1007.0,
          "cy": 624.5,
          "entryX": 1012.9,
          "entryY": 677.9,
          "node": 26,
          "isStairs": false
        },
        {
          "id": "f3_room_1790502692180",
          "name": "S-319 \u2014 HUT Lab",
          "code": "R-155",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 1928.5,
          "cy": 812.5,
          "entryX": 1920.4,
          "entryY": 745.8,
          "node": 57,
          "isStairs": false
        },
        {
          "id": "f3_room_1790523167761",
          "name": "Men's Toilet",
          "code": "WC",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 425.5,
          "cy": 553.5,
          "entryX": 474.2,
          "entryY": 548.1,
          "node": 2,
          "isStairs": false
        },
        {
          "id": "f3_room_1790523236934",
          "name": "Ladies' Toilet",
          "code": "WC",
          "floor": "third",
          "floorIdx": 3,
          "floorTitle": "Third Floor",
          "cx": 486.0,
          "cy": 1092.5,
          "entryX": 533.7,
          "entryY": 1087.2,
          "node": 17,
          "isStairs": false
        }
      ],
      "stairs": {
        "STAIR-NW": {
          "colId": "STAIR-NW",
          "colName": "North-West Stairs (Near Reception / CAD)",
          "roomId": "f3_room_1790500614032",
          "node": 8,
          "entryX": 546.4,
          "entryY": 729.9,
          "cx": 542.5,
          "cy": 688.5
        },
        "STAIR-SW": {
          "colId": "STAIR-SW",
          "colName": "South-West Stairs (Near Acharya / Conf)",
          "roomId": "f3_room_1790500552707",
          "node": 12,
          "entryX": 565.6,
          "entryY": 899.9,
          "cx": 570.5,
          "cy": 942.5
        },
        "STAIR-N": {
          "colId": "STAIR-N",
          "colName": "North Wing Stairs (Near Physics / Chem)",
          "roomId": "f3_room_1790500625267",
          "node": 74,
          "entryX": 849.8,
          "entryY": 324.3,
          "cx": 889.0,
          "cy": 320.5
        },
        "STAIR-CS": {
          "colId": "STAIR-CS",
          "colName": "Central-South Stairs (Near Courtyard)",
          "roomId": "f3_room_1790500639780",
          "node": 62,
          "entryX": 973.0,
          "entryY": 984.2,
          "cx": 922.5,
          "cy": 990.5
        },
        "STAIR-CTR": {
          "colId": "STAIR-CTR",
          "colName": "Central Spine Stairs (Main Axis)",
          "roomId": "f3_room_1790500619454",
          "node": 60,
          "entryX": 949.0,
          "entryY": 769.6,
          "cx": 988.0,
          "cy": 765.0
        },
        "STAIR-NE": {
          "colId": "STAIR-NE",
          "colName": "North-East Stairs (Engineering / Staff)",
          "roomId": "f3_room_1790500650489",
          "node": 91,
          "entryX": 1356.2,
          "entryY": 445.4,
          "cx": 1361.5,
          "cy": 491.5
        },
        "STAIR-E": {
          "colId": "STAIR-E",
          "colName": "East Wing Stairs (Near Computer Labs)",
          "roomId": "f3_room_1790500631547",
          "node": 69,
          "entryX": 1619.3,
          "entryY": 696.2,
          "cx": 1661.0,
          "cy": 691.5
        }
      }
    }
  },
  "allRooms": [
    {
      "id": "room_nanosciences",
      "name": "Amrita Center for Nanosciences",
      "code": "ACN",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 786.5,
      "cy": 360.0,
      "entryX": 852.7,
      "entryY": 352.7,
      "node": 64,
      "isStairs": false
    },
    {
      "id": "room_special_hall",
      "name": "Special Programs Hall / Meditation Hall",
      "code": "SPH-102",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 382.5,
      "cy": 627.0,
      "entryX": 481.8,
      "entryY": 616.1,
      "node": 4,
      "isStairs": false
    },
    {
      "id": "room_gad_office",
      "name": "GAD-PR Office",
      "code": "GAD-103",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 415.5,
      "cy": 702.0,
      "entryX": 423.4,
      "entryY": 749.4,
      "node": 94,
      "isStairs": false
    },
    {
      "id": "room_admin_block_a",
      "name": "Entrance",
      "code": "ADM-BLK-A",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 384.0,
      "cy": 834.5,
      "entryX": 384.0,
      "entryY": 900.0,
      "node": 97,
      "isStairs": false
    },
    {
      "id": "room_admission_office",
      "name": "Admission Office",
      "code": "ADM-105",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 670.0,
      "cy": 659.5,
      "entryX": 676.9,
      "entryY": 714.1,
      "node": 22,
      "isStairs": false
    },
    {
      "id": "room_cir_seminar",
      "name": "CIR Seminar Room",
      "code": "CIR-106",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 861.5,
      "cy": 636.5,
      "entryX": 868.0,
      "entryY": 692.4,
      "node": 24,
      "isStairs": false
    },
    {
      "id": "room_guest_room",
      "name": "Guest Room",
      "code": "GST-107",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 700.5,
      "cy": 937.5,
      "entryX": 694.0,
      "entryY": 886.3,
      "node": 37,
      "isStairs": false
    },
    {
      "id": "room_mini_conf",
      "name": "Mini Conference Room",
      "code": "CONF-MINI",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 443.5,
      "cy": 954.0,
      "entryX": 443.5,
      "entryY": 900.0,
      "node": 98,
      "isStairs": false
    },
    {
      "id": "room_main_conf",
      "name": "Main Conference Room",
      "code": "CONF-MAIN",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 433.5,
      "cy": 1031.5,
      "entryX": 526.3,
      "entryY": 1021.6,
      "node": 17,
      "isStairs": false
    },
    {
      "id": "room_acharya_hall",
      "name": "Acharya Hall",
      "code": "ACH-110",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 606.5,
      "cy": 1157.0,
      "entryX": 599.9,
      "entryY": 1088.3,
      "node": 83,
      "isStairs": false
    },
    {
      "id": "room_stationery",
      "name": "Stationery & Courier",
      "code": "STN-111",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 827.0,
      "cy": 1138.5,
      "entryX": 819.7,
      "entryY": 1058.2,
      "node": 100,
      "isStairs": false
    },
    {
      "id": "room_mfg_lab",
      "name": "Manufacturing Lab",
      "code": "LAB-MFG",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 958.0,
      "cy": 1125.5,
      "entryX": 950.8,
      "entryY": 1046.3,
      "node": 56,
      "isStairs": false
    },
    {
      "id": "room_mat_testing",
      "name": "Material Testing Lab",
      "code": "LAB-MTL",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1102.5,
      "cy": 1110.5,
      "entryX": 1095.5,
      "entryY": 1033.1,
      "node": 104,
      "isStairs": false
    },
    {
      "id": "room_wireless_ctr",
      "name": "Amrita Center for Wireless Networks & Apps",
      "code": "ACWNA",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1015.5,
      "cy": 473.0,
      "entryX": 949.5,
      "entryY": 480.9,
      "node": 71,
      "isStairs": false
    },
    {
      "id": "room_courtyard_west",
      "name": "Courtyard (West)",
      "code": "CYD-WEST",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 723.5,
      "cy": 795.5,
      "entryX": 734.4,
      "entryY": 881.2,
      "node": 38,
      "isStairs": false
    },
    {
      "id": "room_courtyard_central",
      "name": "Courtyard (Central)",
      "code": "CYD-CTR",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1157.0,
      "cy": 745.5,
      "entryX": 1147.6,
      "entryY": 660.0,
      "node": 26,
      "isStairs": false
    },
    {
      "id": "room_director_dean",
      "name": "Director / Associate Dean",
      "code": "DIR-OFFICE",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1184.5,
      "cy": 885.0,
      "entryX": 1178.5,
      "entryY": 830.8,
      "node": 41,
      "isStairs": false
    },
    {
      "id": "room_ladies_infirmary",
      "name": "Ladies Infirmary",
      "code": "INF-118",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1345.0,
      "cy": 866.0,
      "entryX": 1340.0,
      "entryY": 812.2,
      "node": 44,
      "isStairs": false
    },
    {
      "id": "room_metallurgy",
      "name": "Metallurgy Laboratory",
      "code": "LAB-MET",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1239.5,
      "cy": 386.5,
      "entryX": 1247.9,
      "entryY": 455.4,
      "node": 75,
      "isStairs": false
    },
    {
      "id": "room_fluid_mech",
      "name": "Fluid Mechanics Lab",
      "code": "LAB-FML",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1339.5,
      "cy": 374.0,
      "entryX": 1348.1,
      "entryY": 444.1,
      "node": 77,
      "isStairs": false
    },
    {
      "id": "room_cae_cell",
      "name": "C.A.E. Cell",
      "code": "CAE-121",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1434.0,
      "cy": 363.5,
      "entryX": 1441.4,
      "entryY": 433.9,
      "node": 79,
      "isStairs": false
    },
    {
      "id": "room_dynamics_lab",
      "name": "Machine Dynamics Lab",
      "code": "LAB-MDL",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1498.5,
      "cy": 355.5,
      "entryX": 1506.7,
      "entryY": 426.4,
      "node": 80,
      "isStairs": false
    },
    {
      "id": "room_math_dept",
      "name": "Department of Mathematics",
      "code": "MATH-DEPT",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1522.5,
      "cy": 563.5,
      "entryX": 1528.6,
      "entryY": 616.9,
      "node": 32,
      "isStairs": false
    },
    {
      "id": "room_elec_machines",
      "name": "Electrical Machines Lab",
      "code": "LAB-EML",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1745.5,
      "cy": 528.0,
      "entryX": 1752.8,
      "entryY": 591.4,
      "node": 35,
      "isStairs": false
    },
    {
      "id": "room_prayer_hall",
      "name": "Prayer Hall",
      "code": "PRY-125",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1907.5,
      "cy": 509.5,
      "entryX": 1914.7,
      "entryY": 572.9,
      "node": 36,
      "isStairs": false
    },
    {
      "id": "room_courtyard_east",
      "name": "Courtyard (East)",
      "code": "CYD-EAST",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1463.0,
      "cy": 710.0,
      "entryX": 1453.4,
      "entryY": 625.5,
      "node": 31,
      "isStairs": false
    },
    {
      "id": "room_college_admin",
      "name": "College Administration Office",
      "code": "CADM-127",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1554.5,
      "cy": 844.0,
      "entryX": 1548.0,
      "entryY": 788.4,
      "node": 47,
      "isStairs": false
    },
    {
      "id": "room_computer_lab",
      "name": "Computer Lab",
      "code": "LAB-CS",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1763.5,
      "cy": 831.5,
      "entryX": 1755.8,
      "entryY": 764.4,
      "node": 49,
      "isStairs": false
    },
    {
      "id": "room_nanotech_lab",
      "name": "Nanotech Lab",
      "code": "LAB-NANO",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1926.5,
      "cy": 812.0,
      "entryX": 1918.8,
      "entryY": 745.6,
      "node": 51,
      "isStairs": false
    },
    {
      "id": "room_mech_workshop",
      "name": "Mechanical Workshop",
      "code": "LAB-MECH",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1351.0,
      "cy": 1074.5,
      "entryX": 1344.8,
      "entryY": 1011.8,
      "node": 107,
      "isStairs": false
    },
    {
      "id": "room_robotics_lab",
      "name": "CNC Robotics & Autom. Lab",
      "code": "LAB-ROBO",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1448.5,
      "cy": 1063.0,
      "entryX": 1441.6,
      "entryY": 1001.3,
      "node": 108,
      "isStairs": false
    },
    {
      "id": "room_wind_tunnel",
      "name": "Wind Tunnel",
      "code": "LAB-WIND",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1547.5,
      "cy": 1052.5,
      "entryX": 1541.0,
      "entryY": 990.3,
      "node": 109,
      "isStairs": false
    },
    {
      "id": "room_1790266501061",
      "name": "M Tech (Fluid Lab )",
      "code": "LAB-FLUID",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1007.5,
      "cy": 388.5,
      "entryX": 939.5,
      "entryY": 396.0,
      "node": 70,
      "isStairs": false
    },
    {
      "id": "room_1790266683270",
      "name": "Room 36",
      "code": "R-136",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 991.0,
      "cy": 254.0,
      "entryX": 924.7,
      "entryY": 261.3,
      "node": 68,
      "isStairs": false
    },
    {
      "id": "room_1790267011208",
      "name": "Principal Arts and Sciences",
      "code": "Arts and Science",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1279.0,
      "cy": 870.5,
      "entryX": 1272.8,
      "entryY": 819.9,
      "node": 42,
      "isStairs": false
    },
    {
      "id": "room_1790267197118",
      "name": "Conference Room",
      "code": "Conference",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1394.5,
      "cy": 861.5,
      "entryX": 1388.4,
      "entryY": 806.6,
      "node": 45,
      "isStairs": false
    },
    {
      "id": "room_1790267337608",
      "name": "AUMS Web Services",
      "code": "AUMS",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 797.0,
      "cy": 927.5,
      "entryX": 791.4,
      "entryY": 875.1,
      "node": 39,
      "isStairs": false
    },
    {
      "id": "room_1790267611764",
      "name": "Amritheswari Hall ",
      "code": "AMH-101",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 531.5,
      "cy": 464.0,
      "entryX": 540.8,
      "entryY": 537.6,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "room_1790267932589",
      "name": "Students Affair",
      "code": "SA",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1152.0,
      "cy": 604.5,
      "entryX": 1158.0,
      "entryY": 658.8,
      "node": 26,
      "isStairs": false
    },
    {
      "id": "room_1790267966500",
      "name": "Reserve",
      "code": "",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1249.0,
      "cy": 592.5,
      "entryX": 1255.2,
      "entryY": 648.1,
      "node": 28,
      "isStairs": false
    },
    {
      "id": "room_1790268001235",
      "name": "Principal",
      "code": "",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1343.0,
      "cy": 580.5,
      "entryX": 1349.1,
      "entryY": 637.7,
      "node": 30,
      "isStairs": false
    },
    {
      "id": "room_1790268898290",
      "name": "Courtyard (Far East) ",
      "code": "CYD-Far EAST",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1790.0,
      "cy": 674.5,
      "entryX": 1799.8,
      "entryY": 759.3,
      "node": 49,
      "isStairs": false
    },
    {
      "id": "room_1790578035647",
      "name": "Stairs",
      "code": "R-145",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1369.0,
      "cy": 476.5,
      "entryX": 1365.2,
      "entryY": 442.1,
      "node": 77,
      "isStairs": true,
      "stairColId": "STAIR-NE"
    },
    {
      "id": "room_1790578073580",
      "name": "Stairs",
      "code": "R-146",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 930.0,
      "cy": 1020.0,
      "entryX": 932.5,
      "entryY": 1048.0,
      "node": 102,
      "isStairs": true,
      "stairColId": "STAIR-CS"
    },
    {
      "id": "room_1790578100156",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1210.0,
      "cy": 1080.0,
      "entryX": 1204.8,
      "entryY": 1023.2,
      "node": 105,
      "isStairs": false
    },
    {
      "id": "room_1790578145285",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1677.0,
      "cy": 1060.0,
      "entryX": 1656.0,
      "entryY": 1022.0,
      "node": 61,
      "isStairs": false
    },
    {
      "id": "room_1790578197842",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 480.0,
      "cy": 1093.5,
      "entryX": 533.7,
      "entryY": 1087.3,
      "node": 19,
      "isStairs": false
    },
    {
      "id": "room_1790578250255",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 425.5,
      "cy": 553.5,
      "entryX": 474.2,
      "entryY": 548.1,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "room_1790578281913",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 867.0,
      "cy": 118.5,
      "entryX": 871.5,
      "entryY": 158.4,
      "node": 73,
      "isStairs": false
    },
    {
      "id": "room_1790578307230",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1594.0,
      "cy": 324.0,
      "entryX": 1580.0,
      "entryY": 360.0,
      "node": 90,
      "isStairs": false
    },
    {
      "id": "room_1790578386471",
      "name": "Stairs",
      "code": "R-152",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 890.0,
      "cy": 330.0,
      "entryX": 850.7,
      "entryY": 334.3,
      "node": 64,
      "isStairs": true,
      "stairColId": "STAIR-N"
    },
    {
      "id": "room_1790578435142",
      "name": "Stairs",
      "code": "R-153",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 989.0,
      "cy": 764.5,
      "entryX": 947.9,
      "entryY": 769.1,
      "node": 53,
      "isStairs": true,
      "stairColId": "STAIR-CTR"
    },
    {
      "id": "room_1790578489388",
      "name": "Stairs",
      "code": "R-154",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1660.0,
      "cy": 689.5,
      "entryX": 1619.1,
      "entryY": 694.3,
      "node": 59,
      "isStairs": true,
      "stairColId": "STAIR-E"
    },
    {
      "id": "room_1790578512841",
      "name": "Stairs",
      "code": "R-155",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 572.0,
      "cy": 940.0,
      "entryX": 567.7,
      "entryY": 900.1,
      "node": 13,
      "isStairs": true,
      "stairColId": "STAIR-SW"
    },
    {
      "id": "room_1790578548474",
      "name": "Stairs",
      "code": "R-156",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 537.0,
      "cy": 690.0,
      "entryX": 541.4,
      "entryY": 729.5,
      "node": 8,
      "isStairs": true,
      "stairColId": "STAIR-NW"
    },
    {
      "id": "f1_room_nanosciences",
      "name": "N-107 \u2014 Physics Lab",
      "code": "ACN",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 786.5,
      "cy": 360.0,
      "entryX": 852.7,
      "entryY": 352.7,
      "node": 83,
      "isStairs": false
    },
    {
      "id": "f1_room_special_hall",
      "name": "A-105 \u2014 General Administration Dept. (CAD)",
      "code": "SPH-102",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 382.5,
      "cy": 627.0,
      "entryX": 481.8,
      "entryY": 616.1,
      "node": 4,
      "isStairs": false
    },
    {
      "id": "f1_room_gad_office",
      "name": "ICTS \u2014 Reprographics Center",
      "code": "GAD-103",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 415.5,
      "cy": 702.0,
      "entryX": 490.2,
      "entryY": 693.7,
      "node": 7,
      "isStairs": false
    },
    {
      "id": "f1_room_admin_block_a",
      "name": "A-104 \u2014 Accounts Office",
      "code": "ADM-BLK-A",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 384.0,
      "cy": 832.5,
      "entryX": 504.1,
      "entryY": 819.3,
      "node": 14,
      "isStairs": false
    },
    {
      "id": "f1_room_admission_office",
      "name": "N-101",
      "code": "ADM-105",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 668.0,
      "cy": 661.5,
      "entryX": 674.7,
      "entryY": 714.4,
      "node": 24,
      "isStairs": false
    },
    {
      "id": "f1_room_cir_seminar",
      "name": "N-103",
      "code": "CIR-106",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 861.5,
      "cy": 638.5,
      "entryX": 867.4,
      "entryY": 692.7,
      "node": 28,
      "isStairs": false
    },
    {
      "id": "f1_room_guest_room",
      "name": "S-101",
      "code": "GST-107",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 700.5,
      "cy": 937.5,
      "entryX": 694.5,
      "entryY": 885.9,
      "node": 47,
      "isStairs": false
    },
    {
      "id": "f1_room_mini_conf",
      "name": "A-104A \u2014 Reserve",
      "code": "CONF-MINI",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 443.5,
      "cy": 954.0,
      "entryX": 518.1,
      "entryY": 945.7,
      "node": 18,
      "isStairs": false
    },
    {
      "id": "f1_room_main_conf",
      "name": "A-103 \u2014 ICTS",
      "code": "CONF-MAIN",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 433.5,
      "cy": 1031.5,
      "entryX": 526.4,
      "entryY": 1020.7,
      "node": 20,
      "isStairs": false
    },
    {
      "id": "f1_room_acharya_hall",
      "name": "A-102 \u2014 ICTS-Stores",
      "code": "ACH-110",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 606.5,
      "cy": 1157.0,
      "entryX": 598.4,
      "entryY": 1087.5,
      "node": 105,
      "isStairs": false
    },
    {
      "id": "f1_room_stationery",
      "name": "A-101 \u2014 ICTS Server Room",
      "code": "STN-111",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 827.0,
      "cy": 1138.5,
      "entryX": 819.4,
      "entryY": 1067.5,
      "node": 110,
      "isStairs": false
    },
    {
      "id": "f1_room_mfg_lab",
      "name": "S-104 \u2014 Dept. of English / MSW / Physical Education / Philosophy",
      "code": "LAB-MFG",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 958.0,
      "cy": 1125.5,
      "entryX": 950.3,
      "entryY": 1053.4,
      "node": 113,
      "isStairs": false
    },
    {
      "id": "f1_room_mat_testing",
      "name": "S-105 \u2014 Cisco Lab / ICPC Lab / MSW Specialization",
      "code": "LAB-MTL",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1102.5,
      "cy": 1110.5,
      "entryX": 1094.6,
      "entryY": 1036.8,
      "node": 116,
      "isStairs": false
    },
    {
      "id": "f1_room_wireless_ctr",
      "name": "N-108 \u2014 B.Tech Chemistry Lab",
      "code": "ACWNA",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1015.5,
      "cy": 473.0,
      "entryX": 949.5,
      "entryY": 480.9,
      "node": 90,
      "isStairs": false
    },
    {
      "id": "f1_room_north_wing",
      "name": "North Corridor Wing",
      "code": "CORR-N",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 890.0,
      "cy": 330.0,
      "entryX": 850.7,
      "entryY": 334.3,
      "node": 83,
      "isStairs": false
    },
    {
      "id": "f1_room_director_dean",
      "name": "S-107",
      "code": "DIR-OFFICE",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1184.5,
      "cy": 885.0,
      "entryX": 1178.5,
      "entryY": 830.8,
      "node": 54,
      "isStairs": false
    },
    {
      "id": "f1_room_ladies_infirmary",
      "name": "HOD-ECE",
      "code": "INF-118",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1345.0,
      "cy": 866.0,
      "entryX": 1338.4,
      "entryY": 812.8,
      "node": 58,
      "isStairs": false
    },
    {
      "id": "f1_room_metallurgy",
      "name": "N-116 \u2014 EEM Lab",
      "code": "LAB-MET",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1239.5,
      "cy": 386.5,
      "entryX": 1246.6,
      "entryY": 457.3,
      "node": 94,
      "isStairs": false
    },
    {
      "id": "f1_room_fluid_mech",
      "name": "N-116A \u2014 Control & Instrum. Lab",
      "code": "LAB-FML",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1339.5,
      "cy": 374.0,
      "entryX": 1346.9,
      "entryY": 446.2,
      "node": 96,
      "isStairs": false
    },
    {
      "id": "f1_room_cae_cell",
      "name": "N-119",
      "code": "CAE-121",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1434.0,
      "cy": 363.5,
      "entryX": 1442.1,
      "entryY": 435.1,
      "node": 99,
      "isStairs": false
    },
    {
      "id": "f1_room_dynamics_lab",
      "name": "N-117 \u2014 Power & Energy Lab (EEE)",
      "code": "LAB-MDL",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1498.5,
      "cy": 355.5,
      "entryX": 1506.9,
      "entryY": 427.7,
      "node": 100,
      "isStairs": false
    },
    {
      "id": "f1_room_math_dept",
      "name": "N-118 \u2014 CSE Staff Room",
      "code": "MATH-DEPT",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1522.5,
      "cy": 563.5,
      "entryX": 1528.6,
      "entryY": 616.9,
      "node": 39,
      "isStairs": false
    },
    {
      "id": "f1_room_elec_machines",
      "name": "N-120",
      "code": "LAB-EML",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1745.5,
      "cy": 528.0,
      "entryX": 1752.8,
      "entryY": 591.4,
      "node": 42,
      "isStairs": false
    },
    {
      "id": "f1_room_prayer_hall",
      "name": "Room 12",
      "code": "PRY-125",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1907.5,
      "cy": 509.5,
      "entryX": 1915.3,
      "entryY": 572.9,
      "node": 45,
      "isStairs": false
    },
    {
      "id": "f1_room_college_admin",
      "name": "S-114 \u2014 ECE Staff Room",
      "code": "CADM-127",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1554.5,
      "cy": 844.0,
      "entryX": 1548.4,
      "entryY": 789.0,
      "node": 62,
      "isStairs": false
    },
    {
      "id": "f1_room_computer_lab",
      "name": "S-115 \u2014 Computer Lab",
      "code": "LAB-CS",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1763.5,
      "cy": 831.5,
      "entryX": 1755.8,
      "entryY": 764.4,
      "node": 66,
      "isStairs": false
    },
    {
      "id": "f1_room_nanotech_lab",
      "name": "S-117 \u2014 Micro Processor Lab",
      "code": "LAB-NANO",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1955.5,
      "cy": 652.5,
      "entryX": 1950.0,
      "entryY": 702.0,
      "node": 131,
      "isStairs": false
    },
    {
      "id": "f1_room_mech_workshop",
      "name": "S-103",
      "code": "LAB-MECH",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1351.0,
      "cy": 1074.5,
      "entryX": 1343.3,
      "entryY": 1002.4,
      "node": 121,
      "isStairs": false
    },
    {
      "id": "f1_room_robotics_lab",
      "name": "S-102",
      "code": "LAB-ROBO",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1448.5,
      "cy": 1063.0,
      "entryX": 1441.0,
      "entryY": 992.1,
      "node": 123,
      "isStairs": false
    },
    {
      "id": "f1_room_wind_tunnel",
      "name": "S-101",
      "code": "LAB-WIND",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1547.5,
      "cy": 1052.5,
      "entryX": 1540.0,
      "entryY": 981.7,
      "node": 124,
      "isStairs": false
    },
    {
      "id": "f1_room_1790266501061",
      "name": "N-109 \u2014 M.Sc Chemistry Lab",
      "code": "LAB-FLUID",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1007.5,
      "cy": 388.5,
      "entryX": 939.5,
      "entryY": 396.0,
      "node": 89,
      "isStairs": false
    },
    {
      "id": "f1_room_1790266683270",
      "name": "N-110 \u2014 Chem. Research Lab",
      "code": "R-136",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 991.0,
      "cy": 254.0,
      "entryX": 924.7,
      "entryY": 261.3,
      "node": 87,
      "isStairs": false
    },
    {
      "id": "f1_room_1790267011208",
      "name": "S-108",
      "code": "Arts and Science",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1281.0,
      "cy": 874.5,
      "entryX": 1275.0,
      "entryY": 820.1,
      "node": 56,
      "isStairs": false
    },
    {
      "id": "f1_room_1790267197118",
      "name": "S-109 \u2014 Chairman CSE Dept.",
      "code": "Conference",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1394.5,
      "cy": 861.5,
      "entryX": 1388.4,
      "entryY": 806.6,
      "node": 59,
      "isStairs": false
    },
    {
      "id": "f1_room_1790267337608",
      "name": "S-102",
      "code": "AUMS",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 797.0,
      "cy": 927.5,
      "entryX": 791.4,
      "entryY": 875.1,
      "node": 48,
      "isStairs": false
    },
    {
      "id": "f1_room_1790267611764",
      "name": "A-108",
      "code": "AMH-101",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 531.5,
      "cy": 464.0,
      "entryX": 540.1,
      "entryY": 538.3,
      "node": 133,
      "isStairs": false
    },
    {
      "id": "f1_room_1790267932589",
      "name": "N-113",
      "code": "SA",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1152.0,
      "cy": 604.5,
      "entryX": 1157.9,
      "entryY": 658.9,
      "node": 33,
      "isStairs": false
    },
    {
      "id": "f1_room_1790267966500",
      "name": "N-114",
      "code": "",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1249.0,
      "cy": 592.5,
      "entryX": 1255.2,
      "entryY": 648.1,
      "node": 35,
      "isStairs": false
    },
    {
      "id": "f1_room_1790268001235",
      "name": "N-115 \u2014 Dept. of CSE/CSA",
      "code": "",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1343.0,
      "cy": 580.5,
      "entryX": 1349.1,
      "entryY": 637.7,
      "node": 37,
      "isStairs": false
    },
    {
      "id": "f1_room_1790500434656",
      "name": "S-105",
      "code": "R-145",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1056.5,
      "cy": 900.0,
      "entryX": 1050.4,
      "entryY": 844.8,
      "node": 53,
      "isStairs": false
    },
    {
      "id": "f1_room_1790500485062",
      "name": "S-103",
      "code": "R-146",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 898.0,
      "cy": 916.0,
      "entryX": 892.3,
      "entryY": 863.1,
      "node": 50,
      "isStairs": false
    },
    {
      "id": "f1_room_1790500552707",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 570.5,
      "cy": 942.5,
      "entryX": 565.9,
      "entryY": 900.4,
      "node": 16,
      "isStairs": true,
      "stairColId": "STAIR-SW"
    },
    {
      "id": "f1_room_1790500614032",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 542.5,
      "cy": 688.5,
      "entryX": 547.0,
      "entryY": 728.9,
      "node": 12,
      "isStairs": true,
      "stairColId": "STAIR-NW"
    },
    {
      "id": "f1_room_1790500619454",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 988.0,
      "cy": 765.0,
      "entryX": 947.9,
      "entryY": 769.4,
      "node": 72,
      "isStairs": true,
      "stairColId": "STAIR-CTR"
    },
    {
      "id": "f1_room_1790500625267",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 889.0,
      "cy": 320.5,
      "entryX": 849.7,
      "entryY": 324.8,
      "node": 83,
      "isStairs": true,
      "stairColId": "STAIR-N"
    },
    {
      "id": "f1_room_1790500631547",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1661.0,
      "cy": 691.5,
      "entryX": 1619.3,
      "entryY": 696.4,
      "node": 78,
      "isStairs": true,
      "stairColId": "STAIR-E"
    },
    {
      "id": "f1_room_1790500639780",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 922.5,
      "cy": 990.5,
      "entryX": 973.0,
      "entryY": 984.2,
      "node": 74,
      "isStairs": true,
      "stairColId": "STAIR-CS"
    },
    {
      "id": "f1_room_1790500650489",
      "name": "Stairs",
      "code": "R-147",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1361.5,
      "cy": 491.5,
      "entryX": 1356.8,
      "entryY": 445.1,
      "node": 96,
      "isStairs": true,
      "stairColId": "STAIR-NE"
    },
    {
      "id": "f1_room_1790500850398",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 869.5,
      "cy": 117.5,
      "entryX": 871.5,
      "entryY": 158.4,
      "node": 92,
      "isStairs": false
    },
    {
      "id": "f1_room_1790500900853",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1676.5,
      "cy": 1056.0,
      "entryX": 1657.0,
      "entryY": 1024.0,
      "node": 80,
      "isStairs": false
    },
    {
      "id": "f1_room_1790500984653",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1210.5,
      "cy": 1079.5,
      "entryX": 1203.5,
      "entryY": 1024.6,
      "node": 118,
      "isStairs": false
    },
    {
      "id": "f1_room_1790501046808",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1594.0,
      "cy": 324.0,
      "entryX": 1583.0,
      "entryY": 359.0,
      "node": 76,
      "isStairs": false
    },
    {
      "id": "f1_room_1790501831784",
      "name": "N-102",
      "code": "ADM-105",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 766.5,
      "cy": 650.5,
      "entryX": 772.1,
      "entryY": 703.1,
      "node": 26,
      "isStairs": false
    },
    {
      "id": "f1_room_1790501909379",
      "name": "CS Staff Room",
      "code": "R-155",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 1007.0,
      "cy": 624.5,
      "entryX": 1013.0,
      "entryY": 675.6,
      "node": 30,
      "isStairs": false
    },
    {
      "id": "f1_room_1790521278087",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 480.0,
      "cy": 1093.0,
      "entryX": 534.0,
      "entryY": 1086.7,
      "node": 21,
      "isStairs": false
    },
    {
      "id": "f1_room_1790521338973",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "first",
      "floorIdx": 1,
      "floorTitle": "First Floor",
      "cx": 425.5,
      "cy": 553.5,
      "entryX": 474.2,
      "entryY": 548.1,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "f2_room_nanosciences",
      "name": "N-207",
      "code": "ACN",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 786.5,
      "cy": 360.0,
      "entryX": 852.8,
      "entryY": 351.9,
      "node": 81,
      "isStairs": false
    },
    {
      "id": "f2_room_special_hall",
      "name": "A-208",
      "code": "SPH-102",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 382.5,
      "cy": 627.0,
      "entryX": 481.8,
      "entryY": 616.1,
      "node": 4,
      "isStairs": false
    },
    {
      "id": "f2_room_gad_office",
      "name": "A-207",
      "code": "GAD-103",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 415.5,
      "cy": 702.0,
      "entryX": 490.3,
      "entryY": 693.9,
      "node": 6,
      "isStairs": false
    },
    {
      "id": "f2_room_admin_block_a",
      "name": "A-204",
      "code": "ADM-BLK-A",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 384.0,
      "cy": 832.5,
      "entryX": 504.1,
      "entryY": 819.3,
      "node": 10,
      "isStairs": false
    },
    {
      "id": "f2_room_admission_office",
      "name": "N-201",
      "code": "ADM-105",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 668.0,
      "cy": 661.5,
      "entryX": 675.1,
      "entryY": 717.3,
      "node": 20,
      "isStairs": false
    },
    {
      "id": "f2_room_cir_seminar",
      "name": "N-203",
      "code": "CIR-106",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 861.5,
      "cy": 638.5,
      "entryX": 867.5,
      "entryY": 694.8,
      "node": 24,
      "isStairs": false
    },
    {
      "id": "f2_room_guest_room",
      "name": "S-201",
      "code": "GST-107",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 700.5,
      "cy": 937.5,
      "entryX": 694.0,
      "entryY": 886.3,
      "node": 43,
      "isStairs": false
    },
    {
      "id": "f2_room_mini_conf",
      "name": "A-205",
      "code": "CONF-MINI",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 443.5,
      "cy": 954.0,
      "entryX": 518.1,
      "entryY": 945.7,
      "node": 14,
      "isStairs": false
    },
    {
      "id": "f2_room_main_conf",
      "name": "A-203",
      "code": "CONF-MAIN",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 433.5,
      "cy": 1031.5,
      "entryX": 526.4,
      "entryY": 1021.2,
      "node": 16,
      "isStairs": false
    },
    {
      "id": "f2_room_acharya_hall",
      "name": "A-202",
      "code": "ACH-110",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 606.5,
      "cy": 1157.0,
      "entryX": 598.3,
      "entryY": 1087.6,
      "node": 110,
      "isStairs": false
    },
    {
      "id": "f2_room_stationery",
      "name": "A-201",
      "code": "STN-111",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 827.0,
      "cy": 1138.5,
      "entryX": 819.4,
      "entryY": 1067.5,
      "node": 115,
      "isStairs": false
    },
    {
      "id": "f2_room_mfg_lab",
      "name": "S-205",
      "code": "LAB-MFG",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 958.0,
      "cy": 1125.5,
      "entryX": 950.3,
      "entryY": 1053.4,
      "node": 118,
      "isStairs": false
    },
    {
      "id": "f2_room_mat_testing",
      "name": "S-206",
      "code": "LAB-MTL",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1102.5,
      "cy": 1110.5,
      "entryX": 1094.5,
      "entryY": 1036.8,
      "node": 120,
      "isStairs": false
    },
    {
      "id": "f2_room_wireless_ctr",
      "name": "N-208",
      "code": "ACWNA",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1015.5,
      "cy": 473.0,
      "entryX": 949.8,
      "entryY": 479.6,
      "node": 96,
      "isStairs": false
    },
    {
      "id": "f2_room_north_wing",
      "name": "North Corridor Wing",
      "code": "CORR-N",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 890.0,
      "cy": 330.0,
      "entryX": 850.7,
      "entryY": 333.8,
      "node": 81,
      "isStairs": false
    },
    {
      "id": "f2_room_director_dean",
      "name": "S-210",
      "code": "DIR-OFFICE",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1184.5,
      "cy": 885.0,
      "entryX": 1178.6,
      "entryY": 830.8,
      "node": 53,
      "isStairs": false
    },
    {
      "id": "f2_room_ladies_infirmary",
      "name": "S-212",
      "code": "INF-118",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1345.0,
      "cy": 866.0,
      "entryX": 1338.2,
      "entryY": 811.8,
      "node": 57,
      "isStairs": false
    },
    {
      "id": "f2_room_metallurgy",
      "name": "N-218",
      "code": "LAB-MET",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1239.5,
      "cy": 386.5,
      "entryX": 1248.2,
      "entryY": 457.3,
      "node": 100,
      "isStairs": false
    },
    {
      "id": "f2_room_fluid_mech",
      "name": "N-220 / N-219",
      "code": "LAB-FML",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1339.5,
      "cy": 374.0,
      "entryX": 1348.3,
      "entryY": 446.1,
      "node": 102,
      "isStairs": false
    },
    {
      "id": "f2_room_cae_cell",
      "name": "N-221",
      "code": "CAE-121",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1434.0,
      "cy": 363.5,
      "entryX": 1441.7,
      "entryY": 435.9,
      "node": 104,
      "isStairs": false
    },
    {
      "id": "f2_room_dynamics_lab",
      "name": "N-220",
      "code": "LAB-MDL",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1498.5,
      "cy": 355.5,
      "entryX": 1506.9,
      "entryY": 428.4,
      "node": 105,
      "isStairs": false
    },
    {
      "id": "f2_room_math_dept",
      "name": "N-222",
      "code": "MATH-DEPT",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1522.5,
      "cy": 563.5,
      "entryX": 1529.4,
      "entryY": 619.7,
      "node": 35,
      "isStairs": false
    },
    {
      "id": "f2_room_elec_machines",
      "name": "N-223",
      "code": "LAB-EML",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1745.5,
      "cy": 528.0,
      "entryX": 1753.7,
      "entryY": 592.7,
      "node": 38,
      "isStairs": false
    },
    {
      "id": "f2_room_prayer_hall",
      "name": "N-225",
      "code": "PRY-125",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1907.5,
      "cy": 509.5,
      "entryX": 1914.9,
      "entryY": 573.4,
      "node": 40,
      "isStairs": false
    },
    {
      "id": "f2_room_college_admin",
      "name": "S-216",
      "code": "CADM-127",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1554.5,
      "cy": 844.0,
      "entryX": 1547.8,
      "entryY": 788.9,
      "node": 61,
      "isStairs": false
    },
    {
      "id": "f2_room_computer_lab",
      "name": "S-220 / S-219 / S-218 / S-217",
      "code": "LAB-CS",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1754.5,
      "cy": 833.5,
      "entryX": 1746.6,
      "entryY": 765.4,
      "node": 64,
      "isStairs": false
    },
    {
      "id": "f2_room_mech_workshop",
      "name": "S-203",
      "code": "LAB-MECH",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1351.0,
      "cy": 1074.5,
      "entryX": 1343.3,
      "entryY": 1005.3,
      "node": 125,
      "isStairs": false
    },
    {
      "id": "f2_room_robotics_lab",
      "name": "S-202",
      "code": "LAB-ROBO",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1448.5,
      "cy": 1063.0,
      "entryX": 1440.9,
      "entryY": 994.5,
      "node": 127,
      "isStairs": false
    },
    {
      "id": "f2_room_wind_tunnel",
      "name": "S-214",
      "code": "LAB-WIND",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1547.5,
      "cy": 1052.5,
      "entryX": 1538.4,
      "entryY": 983.9,
      "node": 128,
      "isStairs": false
    },
    {
      "id": "f2_room_1790266501061",
      "name": "N-209",
      "code": "LAB-FLUID",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1007.5,
      "cy": 388.5,
      "entryX": 940.4,
      "entryY": 395.0,
      "node": 94,
      "isStairs": false
    },
    {
      "id": "f2_room_1790266683270",
      "name": "N-210",
      "code": "R-136",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 991.0,
      "cy": 254.0,
      "entryX": 925.8,
      "entryY": 261.9,
      "node": 89,
      "isStairs": false
    },
    {
      "id": "f2_room_1790267011208",
      "name": "S-211",
      "code": "Arts and Science",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1281.0,
      "cy": 874.5,
      "entryX": 1274.8,
      "entryY": 819.1,
      "node": 55,
      "isStairs": false
    },
    {
      "id": "f2_room_1790267197118",
      "name": "S-212",
      "code": "Conference",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1394.5,
      "cy": 861.5,
      "entryX": 1388.5,
      "entryY": 806.5,
      "node": 59,
      "isStairs": false
    },
    {
      "id": "f2_room_1790267337608",
      "name": "S-202",
      "code": "AUMS",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 797.0,
      "cy": 927.5,
      "entryX": 791.4,
      "entryY": 875.1,
      "node": 45,
      "isStairs": false
    },
    {
      "id": "f2_room_1790267611764",
      "name": "A-210",
      "code": "AMH-101",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 531.5,
      "cy": 464.0,
      "entryX": 538.5,
      "entryY": 534.1,
      "node": 131,
      "isStairs": false
    },
    {
      "id": "f2_room_1790267932589",
      "name": "N-215",
      "code": "SA",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1152.0,
      "cy": 604.5,
      "entryX": 1158.2,
      "entryY": 662.0,
      "node": 29,
      "isStairs": false
    },
    {
      "id": "f2_room_1790267966500",
      "name": "N-216",
      "code": "",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1249.0,
      "cy": 592.5,
      "entryX": 1255.5,
      "entryY": 651.2,
      "node": 31,
      "isStairs": false
    },
    {
      "id": "f2_room_1790268001235",
      "name": "N-217",
      "code": "",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1343.0,
      "cy": 580.5,
      "entryX": 1349.5,
      "entryY": 639.8,
      "node": 33,
      "isStairs": false
    },
    {
      "id": "f2_room_1790500434656",
      "name": "S-206",
      "code": "R-145",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1056.5,
      "cy": 900.0,
      "entryX": 1050.5,
      "entryY": 844.8,
      "node": 50,
      "isStairs": false
    },
    {
      "id": "f2_room_1790500485062",
      "name": "S-203",
      "code": "R-146",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 898.0,
      "cy": 916.0,
      "entryX": 892.3,
      "entryY": 863.1,
      "node": 47,
      "isStairs": false
    },
    {
      "id": "f2_room_1790500552707",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 570.5,
      "cy": 942.5,
      "entryX": 566.0,
      "entryY": 900.3,
      "node": 12,
      "isStairs": true,
      "stairColId": "STAIR-SW"
    },
    {
      "id": "f2_room_1790500614032",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 542.5,
      "cy": 688.5,
      "entryX": 546.4,
      "entryY": 729.9,
      "node": 8,
      "isStairs": true,
      "stairColId": "STAIR-NW"
    },
    {
      "id": "f2_room_1790500619454",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 988.0,
      "cy": 765.0,
      "entryX": 949.0,
      "entryY": 769.6,
      "node": 68,
      "isStairs": true,
      "stairColId": "STAIR-CTR"
    },
    {
      "id": "f2_room_1790500625267",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 889.0,
      "cy": 320.5,
      "entryX": 849.8,
      "entryY": 324.3,
      "node": 81,
      "isStairs": true,
      "stairColId": "STAIR-N"
    },
    {
      "id": "f2_room_1790500631547",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1661.0,
      "cy": 691.5,
      "entryX": 1619.3,
      "entryY": 696.4,
      "node": 74,
      "isStairs": true,
      "stairColId": "STAIR-E"
    },
    {
      "id": "f2_room_1790500639780",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 922.5,
      "cy": 990.5,
      "entryX": 973.0,
      "entryY": 984.2,
      "node": 70,
      "isStairs": true,
      "stairColId": "STAIR-CS"
    },
    {
      "id": "f2_room_1790500650489",
      "name": "Stairs",
      "code": "R-147",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1361.5,
      "cy": 491.5,
      "entryX": 1355.8,
      "entryY": 445.1,
      "node": 102,
      "isStairs": true,
      "stairColId": "STAIR-NE"
    },
    {
      "id": "f2_room_1790500850398",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 869.5,
      "cy": 117.5,
      "entryX": 871.5,
      "entryY": 158.4,
      "node": 98,
      "isStairs": false
    },
    {
      "id": "f2_room_1790500900853",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1676.5,
      "cy": 1056.0,
      "entryX": 1657.0,
      "entryY": 1024.0,
      "node": 76,
      "isStairs": false
    },
    {
      "id": "f2_room_1790500984653",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1210.5,
      "cy": 1079.5,
      "entryX": 1203.5,
      "entryY": 1024.6,
      "node": 122,
      "isStairs": false
    },
    {
      "id": "f2_room_1790501046808",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1594.0,
      "cy": 324.0,
      "entryX": 1583.0,
      "entryY": 359.0,
      "node": 73,
      "isStairs": false
    },
    {
      "id": "f2_room_1790501831784",
      "name": "N-202",
      "code": "ADM-105",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 766.5,
      "cy": 650.5,
      "entryX": 773.6,
      "entryY": 705.9,
      "node": 22,
      "isStairs": false
    },
    {
      "id": "f2_room_1790501909379",
      "name": "N-214",
      "code": "R-155",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1007.0,
      "cy": 624.5,
      "entryX": 1012.9,
      "entryY": 677.9,
      "node": 27,
      "isStairs": false
    },
    {
      "id": "f2_room_1790502692180",
      "name": "Microwave Lab",
      "code": "R-155",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 1928.5,
      "cy": 812.5,
      "entryX": 1920.8,
      "entryY": 745.3,
      "node": 66,
      "isStairs": false
    },
    {
      "id": "f2_room_1790520116929",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 486.0,
      "cy": 1092.5,
      "entryX": 533.7,
      "entryY": 1087.2,
      "node": 17,
      "isStairs": false
    },
    {
      "id": "f2_room_1790520135835",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "second",
      "floorIdx": 2,
      "floorTitle": "Second Floor",
      "cx": 425.5,
      "cy": 553.5,
      "entryX": 474.2,
      "entryY": 548.1,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "f3_room_nanosciences",
      "name": "N-306",
      "code": "ACN",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 786.5,
      "cy": 360.0,
      "entryX": 852.8,
      "entryY": 351.9,
      "node": 74,
      "isStairs": false
    },
    {
      "id": "f3_room_special_hall",
      "name": "A-308",
      "code": "SPH-102",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 382.5,
      "cy": 627.0,
      "entryX": 481.8,
      "entryY": 616.1,
      "node": 4,
      "isStairs": false
    },
    {
      "id": "f3_room_gad_office",
      "name": "A-307",
      "code": "GAD-103",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 415.5,
      "cy": 702.0,
      "entryX": 490.3,
      "entryY": 693.9,
      "node": 6,
      "isStairs": false
    },
    {
      "id": "f3_room_admin_block_a",
      "name": "A-304",
      "code": "ADM-BLK-A",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 384.0,
      "cy": 832.5,
      "entryX": 504.1,
      "entryY": 819.3,
      "node": 10,
      "isStairs": false
    },
    {
      "id": "f3_room_admission_office",
      "name": "N-301",
      "code": "ADM-105",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 668.0,
      "cy": 661.5,
      "entryX": 675.1,
      "entryY": 717.3,
      "node": 20,
      "isStairs": false
    },
    {
      "id": "f3_room_cir_seminar",
      "name": "N-303",
      "code": "CIR-106",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 861.5,
      "cy": 638.5,
      "entryX": 867.5,
      "entryY": 694.8,
      "node": 24,
      "isStairs": false
    },
    {
      "id": "f3_room_guest_room",
      "name": "S-301",
      "code": "GST-107",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 700.5,
      "cy": 937.5,
      "entryX": 694.8,
      "entryY": 885.5,
      "node": 40,
      "isStairs": false
    },
    {
      "id": "f3_room_mini_conf",
      "name": "A-305",
      "code": "CONF-MINI",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 443.5,
      "cy": 954.0,
      "entryX": 518.1,
      "entryY": 945.7,
      "node": 14,
      "isStairs": false
    },
    {
      "id": "f3_room_main_conf",
      "name": "A-303",
      "code": "CONF-MAIN",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 433.5,
      "cy": 1031.5,
      "entryX": 526.4,
      "entryY": 1021.2,
      "node": 16,
      "isStairs": false
    },
    {
      "id": "f3_room_acharya_hall",
      "name": "A-302",
      "code": "ACH-110",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 606.5,
      "cy": 1157.0,
      "entryX": 598.3,
      "entryY": 1087.6,
      "node": 101,
      "isStairs": false
    },
    {
      "id": "f3_room_stationery",
      "name": "A-301",
      "code": "STN-111",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 827.0,
      "cy": 1138.5,
      "entryX": 820.9,
      "entryY": 1082.0,
      "node": 106,
      "isStairs": false
    },
    {
      "id": "f3_room_mfg_lab",
      "name": "S-305",
      "code": "LAB-MFG",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 958.0,
      "cy": 1125.5,
      "entryX": 951.8,
      "entryY": 1067.8,
      "node": 109,
      "isStairs": false
    },
    {
      "id": "f3_room_mat_testing",
      "name": "S-306",
      "code": "LAB-MTL",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1102.5,
      "cy": 1110.5,
      "entryX": 1096.0,
      "entryY": 1051.3,
      "node": 112,
      "isStairs": false
    },
    {
      "id": "f3_room_wireless_ctr",
      "name": "N-317",
      "code": "ACWNA",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1015.5,
      "cy": 473.0,
      "entryX": 949.5,
      "entryY": 480.7,
      "node": 86,
      "isStairs": false
    },
    {
      "id": "f3_room_north_wing",
      "name": "North Corridor Wing",
      "code": "CORR-N",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 890.0,
      "cy": 326.0,
      "entryX": 850.3,
      "entryY": 329.9,
      "node": 74,
      "isStairs": false
    },
    {
      "id": "f3_room_director_dean",
      "name": "S-309",
      "code": "DIR-OFFICE",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1184.5,
      "cy": 885.0,
      "entryX": 1178.6,
      "entryY": 830.8,
      "node": 47,
      "isStairs": false
    },
    {
      "id": "f3_room_ladies_infirmary",
      "name": "S-312",
      "code": "INF-118",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1345.0,
      "cy": 866.0,
      "entryX": 1339.1,
      "entryY": 811.9,
      "node": 49,
      "isStairs": false
    },
    {
      "id": "f3_room_metallurgy",
      "name": "N-319",
      "code": "LAB-MET",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1239.5,
      "cy": 386.5,
      "entryX": 1248.2,
      "entryY": 457.3,
      "node": 90,
      "isStairs": false
    },
    {
      "id": "f3_room_fluid_mech",
      "name": "N-320",
      "code": "LAB-FML",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1339.5,
      "cy": 374.0,
      "entryX": 1347.9,
      "entryY": 446.4,
      "node": 91,
      "isStairs": false
    },
    {
      "id": "f3_room_cae_cell",
      "name": "N-323",
      "code": "CAE-121",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1434.0,
      "cy": 363.5,
      "entryX": 1441.7,
      "entryY": 435.9,
      "node": 93,
      "isStairs": false
    },
    {
      "id": "f3_room_dynamics_lab",
      "name": "N-321",
      "code": "LAB-MDL",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1498.5,
      "cy": 355.5,
      "entryX": 1505.2,
      "entryY": 428.9,
      "node": 95,
      "isStairs": false
    },
    {
      "id": "f3_room_math_dept",
      "name": "N-322",
      "code": "MATH-DEPT",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1522.5,
      "cy": 563.5,
      "entryX": 1529.4,
      "entryY": 619.7,
      "node": 33,
      "isStairs": false
    },
    {
      "id": "f3_room_elec_machines",
      "name": "N-325",
      "code": "LAB-EML",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1745.5,
      "cy": 528.0,
      "entryX": 1752.2,
      "entryY": 597.2,
      "node": 36,
      "isStairs": false
    },
    {
      "id": "f3_room_prayer_hall",
      "name": "N-327",
      "code": "PRY-125",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1907.5,
      "cy": 509.5,
      "entryX": 1914.6,
      "entryY": 582.5,
      "node": 38,
      "isStairs": false
    },
    {
      "id": "f3_room_college_admin",
      "name": "S-315",
      "code": "CADM-127",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1554.5,
      "cy": 844.0,
      "entryX": 1548.2,
      "entryY": 787.9,
      "node": 52,
      "isStairs": false
    },
    {
      "id": "f3_room_computer_lab",
      "name": "S-318",
      "code": "LAB-CS",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1763.5,
      "cy": 831.5,
      "entryX": 1755.8,
      "entryY": 764.4,
      "node": 55,
      "isStairs": false
    },
    {
      "id": "f3_room_mech_workshop",
      "name": "S-311",
      "code": "LAB-MECH",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1351.0,
      "cy": 1074.5,
      "entryX": 1342.0,
      "entryY": 1011.2,
      "node": 115,
      "isStairs": false
    },
    {
      "id": "f3_room_robotics_lab",
      "name": "S-302",
      "code": "LAB-ROBO",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1448.5,
      "cy": 1063.0,
      "entryX": 1439.2,
      "entryY": 997.4,
      "node": 100,
      "isStairs": false
    },
    {
      "id": "f3_room_wind_tunnel",
      "name": "S-314",
      "code": "LAB-WIND",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1547.5,
      "cy": 1052.5,
      "entryX": 1537.5,
      "entryY": 983.2,
      "node": 116,
      "isStairs": false
    },
    {
      "id": "f3_room_1790266501061",
      "name": "N-310",
      "code": "LAB-FLUID",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1007.5,
      "cy": 388.5,
      "entryX": 939.5,
      "entryY": 395.1,
      "node": 84,
      "isStairs": false
    },
    {
      "id": "f3_room_1790266683270",
      "name": "N-309",
      "code": "R-136",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 991.0,
      "cy": 254.0,
      "entryX": 924.7,
      "entryY": 261.3,
      "node": 81,
      "isStairs": false
    },
    {
      "id": "f3_room_1790267011208",
      "name": "S-313",
      "code": "Arts and Science",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1281.0,
      "cy": 874.5,
      "entryX": 1274.2,
      "entryY": 819.2,
      "node": 48,
      "isStairs": false
    },
    {
      "id": "f3_room_1790267197118",
      "name": "S-310",
      "code": "Conference",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1394.5,
      "cy": 861.5,
      "entryX": 1388.0,
      "entryY": 806.5,
      "node": 50,
      "isStairs": false
    },
    {
      "id": "f3_room_1790267337608",
      "name": "S-302",
      "code": "AUMS",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 797.0,
      "cy": 927.5,
      "entryX": 791.4,
      "entryY": 875.1,
      "node": 42,
      "isStairs": false
    },
    {
      "id": "f3_room_1790267611764",
      "name": "A-304/2",
      "code": "AMH-101",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 531.5,
      "cy": 464.0,
      "entryX": 538.5,
      "entryY": 534.1,
      "node": 118,
      "isStairs": false
    },
    {
      "id": "f3_room_1790267932589",
      "name": "N-315",
      "code": "SA",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1152.0,
      "cy": 604.5,
      "entryX": 1158.3,
      "entryY": 661.9,
      "node": 27,
      "isStairs": false
    },
    {
      "id": "f3_room_1790267966500",
      "name": "N-316",
      "code": "",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1249.0,
      "cy": 592.5,
      "entryX": 1255.5,
      "entryY": 651.2,
      "node": 29,
      "isStairs": false
    },
    {
      "id": "f3_room_1790268001235",
      "name": "N-318",
      "code": "",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1343.0,
      "cy": 580.5,
      "entryX": 1349.5,
      "entryY": 639.8,
      "node": 31,
      "isStairs": false
    },
    {
      "id": "f3_room_1790500434656",
      "name": "S-307",
      "code": "R-145",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1056.5,
      "cy": 900.0,
      "entryX": 1050.5,
      "entryY": 844.8,
      "node": 46,
      "isStairs": false
    },
    {
      "id": "f3_room_1790500485062",
      "name": "S-303",
      "code": "R-146",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 898.0,
      "cy": 916.0,
      "entryX": 892.2,
      "entryY": 863.1,
      "node": 44,
      "isStairs": false
    },
    {
      "id": "f3_room_1790500552707",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 570.5,
      "cy": 942.5,
      "entryX": 565.6,
      "entryY": 899.9,
      "node": 12,
      "isStairs": true,
      "stairColId": "STAIR-SW"
    },
    {
      "id": "f3_room_1790500614032",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 542.5,
      "cy": 688.5,
      "entryX": 546.4,
      "entryY": 729.9,
      "node": 8,
      "isStairs": true,
      "stairColId": "STAIR-NW"
    },
    {
      "id": "f3_room_1790500619454",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 988.0,
      "cy": 765.0,
      "entryX": 949.0,
      "entryY": 769.6,
      "node": 60,
      "isStairs": true,
      "stairColId": "STAIR-CTR"
    },
    {
      "id": "f3_room_1790500625267",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 889.0,
      "cy": 320.5,
      "entryX": 849.8,
      "entryY": 324.3,
      "node": 74,
      "isStairs": true,
      "stairColId": "STAIR-N"
    },
    {
      "id": "f3_room_1790500631547",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1661.0,
      "cy": 691.5,
      "entryX": 1619.3,
      "entryY": 696.2,
      "node": 69,
      "isStairs": true,
      "stairColId": "STAIR-E"
    },
    {
      "id": "f3_room_1790500639780",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 922.5,
      "cy": 990.5,
      "entryX": 973.0,
      "entryY": 984.2,
      "node": 62,
      "isStairs": true,
      "stairColId": "STAIR-CS"
    },
    {
      "id": "f3_room_1790500650489",
      "name": "Stairs",
      "code": "R-147",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1361.5,
      "cy": 491.5,
      "entryX": 1356.2,
      "entryY": 445.4,
      "node": 91,
      "isStairs": true,
      "stairColId": "STAIR-NE"
    },
    {
      "id": "f3_room_1790500850398",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 869.5,
      "cy": 117.5,
      "entryX": 871.5,
      "entryY": 158.4,
      "node": 88,
      "isStairs": false
    },
    {
      "id": "f3_room_1790500900853",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1676.5,
      "cy": 1056.0,
      "entryX": 1660.0,
      "entryY": 1020.0,
      "node": 70,
      "isStairs": false
    },
    {
      "id": "f3_room_1790500984653",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1210.5,
      "cy": 1079.5,
      "entryX": 1205.7,
      "entryY": 1038.7,
      "node": 114,
      "isStairs": false
    },
    {
      "id": "f3_room_1790501046808",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1594.0,
      "cy": 324.0,
      "entryX": 1583.0,
      "entryY": 359.0,
      "node": 66,
      "isStairs": false
    },
    {
      "id": "f3_room_1790501831784",
      "name": "N-302",
      "code": "ADM-105",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 766.5,
      "cy": 650.5,
      "entryX": 773.6,
      "entryY": 705.9,
      "node": 22,
      "isStairs": false
    },
    {
      "id": "f3_room_1790501909379",
      "name": "N-314",
      "code": "R-155",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1007.0,
      "cy": 624.5,
      "entryX": 1012.9,
      "entryY": 677.9,
      "node": 26,
      "isStairs": false
    },
    {
      "id": "f3_room_1790502692180",
      "name": "S-319 \u2014 HUT Lab",
      "code": "R-155",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 1928.5,
      "cy": 812.5,
      "entryX": 1920.4,
      "entryY": 745.8,
      "node": 57,
      "isStairs": false
    },
    {
      "id": "f3_room_1790523167761",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 425.5,
      "cy": 553.5,
      "entryX": 474.2,
      "entryY": 548.1,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "f3_room_1790523236934",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "third",
      "floorIdx": 3,
      "floorTitle": "Third Floor",
      "cx": 486.0,
      "cy": 1092.5,
      "entryX": 533.7,
      "entryY": 1087.2,
      "node": 17,
      "isStairs": false
    }
  ],
  "nodes": [
    [
      472.0,
      527.0
    ],
    [
      473.0,
      537.0
    ],
    [
      474.0,
      546.0
    ],
    [
      476.0,
      564.0
    ],
    [
      480.0,
      600.0
    ],
    [
      488.0,
      673.0
    ],
    [
      492.0,
      710.0
    ],
    [
      494.0,
      728.0
    ],
    [
      494.75,
      734.72
    ],
    [
      496.0,
      746.0
    ],
    [
      504.0,
      818.0
    ],
    [
      512.0,
      891.0
    ],
    [
      512.84,
      898.57
    ],
    [
      513.65,
      905.88
    ],
    [
      516.0,
      927.0
    ],
    [
      518.0,
      945.0
    ],
    [
      520.0,
      963.0
    ],
    [
      524.0,
      1000.0
    ],
    [
      529.0,
      1047.0
    ],
    [
      534.5,
      1094.53
    ],
    [
      535.0,
      1099.0
    ],
    [
      536.0,
      1108.0
    ],
    [
      662.0,
      716.0
    ],
    [
      717.0,
      709.0
    ],
    [
      828.0,
      697.0
    ],
    [
      938.48,
      684.16
    ],
    [
      1120.0,
      663.0
    ],
    [
      1211.0,
      653.0
    ],
    [
      1256.0,
      648.0
    ],
    [
      1301.63,
      642.78
    ],
    [
      1365.0,
      636.0
    ],
    [
      1428.31,
      628.35
    ],
    [
      1519.0,
      618.0
    ],
    [
      1609.14,
      607.75
    ],
    [
      1687.0,
      599.0
    ],
    [
      1765.0,
      590.0
    ],
    [
      1921.12,
      572.2
    ],
    [
      681.0,
      888.0
    ],
    [
      736.0,
      881.0
    ],
    [
      792.0,
      875.0
    ],
    [
      958.0,
      855.0
    ],
    [
      1140.0,
      835.0
    ],
    [
      1231.0,
      825.0
    ],
    [
      1321.0,
      814.0
    ],
    [
      1353.0,
      811.0
    ],
    [
      1385.0,
      807.0
    ],
    [
      1448.0,
      800.0
    ],
    [
      1629.0,
      779.0
    ],
    [
      1707.0,
      770.0
    ],
    [
      1785.0,
      761.0
    ],
    [
      1863.0,
      752.0
    ],
    [
      1941.0,
      743.0
    ],
    [
      917.0,
      495.0
    ],
    [
      948.0,
      770.0
    ],
    [
      969.0,
      952.0
    ],
    [
      975.0,
      1000.0
    ],
    [
      979.55,
      1043.68
    ],
    [
      980.0,
      1048.0
    ],
    [
      1591.94,
      456.72
    ],
    [
      1619.0,
      693.0
    ],
    [
      1640.0,
      876.0
    ],
    [
      1656.0,
      1022.0
    ],
    [
      832.0,
      174.0
    ],
    [
      842.0,
      255.0
    ],
    [
      851.0,
      337.0
    ],
    [
      860.0,
      419.0
    ],
    [
      869.0,
      501.0
    ],
    [
      913.51,
      164.65
    ],
    [
      923.0,
      246.0
    ],
    [
      932.0,
      328.0
    ],
    [
      941.0,
      410.0
    ],
    [
      950.75,
      491.53
    ],
    [
      872.77,
      169.29
    ],
    [
      871.53,
      158.36
    ],
    [
      1210.08,
      459.99
    ],
    [
      1259.0,
      454.0
    ],
    [
      1308.0,
      449.0
    ],
    [
      1357.0,
      443.0
    ],
    [
      1406.8,
      437.57
    ],
    [
      1450.0,
      433.0
    ],
    [
      1493.0,
      428.0
    ],
    [
      1580.0,
      418.0
    ],
    [
      1469.86,
      992.99
    ],
    [
      665.0,
      1082.0
    ],
    [
      731.0,
      1076.0
    ],
    [
      748.0,
      1075.0
    ],
    [
      40.0,
      880.0
    ],
    [
      300.0,
      840.0
    ],
    [
      1587.02,
      417.12
    ],
    [
      1586.0,
      409.0
    ],
    [
      1580.0,
      360.0
    ],
    [
      300.0,
      800.0
    ],
    [
      340.0,
      780.0
    ],
    [
      360.0,
      760.0
    ],
    [
      480.0,
      740.0
    ],
    [
      320.0,
      880.0
    ],
    [
      340.0,
      900.0
    ],
    [
      380.0,
      900.0
    ],
    [
      500.0,
      900.0
    ],
    [
      680.0,
      520.0
    ],
    [
      800.0,
      1060.0
    ],
    [
      855.0,
      1055.0
    ],
    [
      910.0,
      1050.0
    ],
    [
      1020.0,
      1040.0
    ],
    [
      1130.0,
      1030.0
    ],
    [
      1240.0,
      1020.0
    ],
    [
      1282.0,
      1018.0
    ],
    [
      1363.0,
      1010.0
    ],
    [
      1444.0,
      1001.0
    ],
    [
      1525.0,
      992.0
    ],
    [
      1640.0,
      980.0
    ],
    [
      1470.42,
      998.06
    ],
    [
      495.15,
      738.32
    ]
  ],
  "edges": [
    {
      "u": 0,
      "v": 1,
      "dist": 10.05
    },
    {
      "u": 1,
      "v": 2,
      "dist": 9.06
    },
    {
      "u": 2,
      "v": 3,
      "dist": 18.11
    },
    {
      "u": 2,
      "v": 99,
      "dist": 207.63
    },
    {
      "u": 3,
      "v": 4,
      "dist": 36.22
    },
    {
      "u": 4,
      "v": 5,
      "dist": 73.44
    },
    {
      "u": 5,
      "v": 6,
      "dist": 37.22
    },
    {
      "u": 6,
      "v": 7,
      "dist": 18.11
    },
    {
      "u": 7,
      "v": 8,
      "dist": 6.76
    },
    {
      "u": 8,
      "v": 9,
      "dist": 11.35
    },
    {
      "u": 8,
      "v": 22,
      "dist": 168.29
    },
    {
      "u": 9,
      "v": 10,
      "dist": 72.44
    },
    {
      "u": 10,
      "v": 11,
      "dist": 73.44
    },
    {
      "u": 11,
      "v": 12,
      "dist": 7.62
    },
    {
      "u": 12,
      "v": 13,
      "dist": 7.35
    },
    {
      "u": 12,
      "v": 98,
      "dist": 12.92
    },
    {
      "u": 13,
      "v": 14,
      "dist": 21.25
    },
    {
      "u": 13,
      "v": 37,
      "dist": 168.3
    },
    {
      "u": 14,
      "v": 15,
      "dist": 18.11
    },
    {
      "u": 15,
      "v": 16,
      "dist": 18.11
    },
    {
      "u": 16,
      "v": 17,
      "dist": 37.22
    },
    {
      "u": 17,
      "v": 18,
      "dist": 47.27
    },
    {
      "u": 18,
      "v": 19,
      "dist": 47.85
    },
    {
      "u": 19,
      "v": 20,
      "dist": 4.5
    },
    {
      "u": 19,
      "v": 83,
      "dist": 131.1
    },
    {
      "u": 20,
      "v": 21,
      "dist": 9.06
    },
    {
      "u": 22,
      "v": 23,
      "dist": 55.44
    },
    {
      "u": 23,
      "v": 24,
      "dist": 111.65
    },
    {
      "u": 24,
      "v": 25,
      "dist": 111.22
    },
    {
      "u": 25,
      "v": 26,
      "dist": 182.75
    },
    {
      "u": 25,
      "v": 52,
      "dist": 190.38
    },
    {
      "u": 25,
      "v": 53,
      "dist": 86.37
    },
    {
      "u": 26,
      "v": 27,
      "dist": 91.55
    },
    {
      "u": 27,
      "v": 28,
      "dist": 45.28
    },
    {
      "u": 28,
      "v": 29,
      "dist": 45.93
    },
    {
      "u": 29,
      "v": 30,
      "dist": 63.73
    },
    {
      "u": 29,
      "v": 43,
      "dist": 172.31
    },
    {
      "u": 30,
      "v": 31,
      "dist": 63.77
    },
    {
      "u": 31,
      "v": 32,
      "dist": 91.28
    },
    {
      "u": 31,
      "v": 78,
      "dist": 191.99
    },
    {
      "u": 32,
      "v": 33,
      "dist": 90.72
    },
    {
      "u": 33,
      "v": 34,
      "dist": 78.35
    },
    {
      "u": 33,
      "v": 58,
      "dist": 152.01
    },
    {
      "u": 33,
      "v": 59,
      "dist": 85.82
    },
    {
      "u": 34,
      "v": 35,
      "dist": 78.52
    },
    {
      "u": 35,
      "v": 36,
      "dist": 157.13
    },
    {
      "u": 36,
      "v": 51,
      "dist": 171.95
    },
    {
      "u": 37,
      "v": 38,
      "dist": 55.44
    },
    {
      "u": 38,
      "v": 39,
      "dist": 56.32
    },
    {
      "u": 39,
      "v": 40,
      "dist": 167.2
    },
    {
      "u": 40,
      "v": 41,
      "dist": 183.1
    },
    {
      "u": 40,
      "v": 53,
      "dist": 85.59
    },
    {
      "u": 40,
      "v": 54,
      "dist": 97.62
    },
    {
      "u": 41,
      "v": 42,
      "dist": 91.55
    },
    {
      "u": 42,
      "v": 43,
      "dist": 90.67
    },
    {
      "u": 43,
      "v": 44,
      "dist": 32.14
    },
    {
      "u": 44,
      "v": 45,
      "dist": 32.25
    },
    {
      "u": 45,
      "v": 46,
      "dist": 63.39
    },
    {
      "u": 46,
      "v": 47,
      "dist": 182.21
    },
    {
      "u": 46,
      "v": 82,
      "dist": 194.22
    },
    {
      "u": 47,
      "v": 48,
      "dist": 78.52
    },
    {
      "u": 47,
      "v": 59,
      "dist": 86.58
    },
    {
      "u": 47,
      "v": 60,
      "dist": 97.62
    },
    {
      "u": 48,
      "v": 49,
      "dist": 78.52
    },
    {
      "u": 49,
      "v": 50,
      "dist": 78.52
    },
    {
      "u": 50,
      "v": 51,
      "dist": 78.52
    },
    {
      "u": 52,
      "v": 66,
      "dist": 48.37
    },
    {
      "u": 52,
      "v": 71,
      "dist": 33.93
    },
    {
      "u": 54,
      "v": 55,
      "dist": 48.37
    },
    {
      "u": 55,
      "v": 56,
      "dist": 43.92
    },
    {
      "u": 56,
      "v": 57,
      "dist": 4.34
    },
    {
      "u": 56,
      "v": 102,
      "dist": 69.84
    },
    {
      "u": 56,
      "v": 103,
      "dist": 40.62
    },
    {
      "u": 58,
      "v": 88,
      "dist": 39.9
    },
    {
      "u": 60,
      "v": 61,
      "dist": 146.87
    },
    {
      "u": 61,
      "v": 110,
      "dist": 44.94
    },
    {
      "u": 62,
      "v": 63,
      "dist": 81.61
    },
    {
      "u": 62,
      "v": 72,
      "dist": 41.04
    },
    {
      "u": 63,
      "v": 64,
      "dist": 82.49
    },
    {
      "u": 64,
      "v": 65,
      "dist": 82.49
    },
    {
      "u": 65,
      "v": 66,
      "dist": 82.49
    },
    {
      "u": 67,
      "v": 68,
      "dist": 81.9
    },
    {
      "u": 67,
      "v": 72,
      "dist": 41.0
    },
    {
      "u": 68,
      "v": 69,
      "dist": 82.49
    },
    {
      "u": 69,
      "v": 70,
      "dist": 82.49
    },
    {
      "u": 70,
      "v": 71,
      "dist": 82.11
    },
    {
      "u": 72,
      "v": 73,
      "dist": 11.0
    },
    {
      "u": 74,
      "v": 75,
      "dist": 49.29
    },
    {
      "u": 75,
      "v": 76,
      "dist": 49.25
    },
    {
      "u": 76,
      "v": 77,
      "dist": 49.37
    },
    {
      "u": 77,
      "v": 78,
      "dist": 50.1
    },
    {
      "u": 78,
      "v": 79,
      "dist": 43.44
    },
    {
      "u": 79,
      "v": 80,
      "dist": 43.29
    },
    {
      "u": 80,
      "v": 81,
      "dist": 87.57
    },
    {
      "u": 81,
      "v": 88,
      "dist": 7.07
    },
    {
      "u": 82,
      "v": 111,
      "dist": 5.1
    },
    {
      "u": 83,
      "v": 84,
      "dist": 66.27
    },
    {
      "u": 84,
      "v": 85,
      "dist": 17.03
    },
    {
      "u": 86,
      "v": 87,
      "dist": 263.06
    },
    {
      "u": 87,
      "v": 91,
      "dist": 40.0
    },
    {
      "u": 87,
      "v": 95,
      "dist": 44.72
    },
    {
      "u": 88,
      "v": 89,
      "dist": 8.18
    },
    {
      "u": 89,
      "v": 90,
      "dist": 49.37
    },
    {
      "u": 91,
      "v": 92,
      "dist": 44.72
    },
    {
      "u": 92,
      "v": 93,
      "dist": 28.28
    },
    {
      "u": 93,
      "v": 94,
      "dist": 121.66
    },
    {
      "u": 94,
      "v": 112,
      "dist": 15.24
    },
    {
      "u": 95,
      "v": 96,
      "dist": 28.28
    },
    {
      "u": 96,
      "v": 97,
      "dist": 40.0
    },
    {
      "u": 97,
      "v": 98,
      "dist": 120.0
    },
    {
      "u": 100,
      "v": 101,
      "dist": 55.23
    },
    {
      "u": 101,
      "v": 102,
      "dist": 55.23
    },
    {
      "u": 103,
      "v": 104,
      "dist": 110.45
    },
    {
      "u": 104,
      "v": 105,
      "dist": 110.45
    },
    {
      "u": 105,
      "v": 106,
      "dist": 42.05
    },
    {
      "u": 106,
      "v": 107,
      "dist": 81.39
    },
    {
      "u": 107,
      "v": 108,
      "dist": 81.5
    },
    {
      "u": 108,
      "v": 109,
      "dist": 81.5
    },
    {
      "u": 109,
      "v": 110,
      "dist": 115.62
    }
  ],
  "rooms": [
    {
      "id": "room_nanosciences",
      "name": "Amrita Center for Nanosciences",
      "code": "ACN",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 786.5,
      "cy": 360.0,
      "entryX": 852.7,
      "entryY": 352.7,
      "node": 64,
      "isStairs": false
    },
    {
      "id": "room_special_hall",
      "name": "Special Programs Hall / Meditation Hall",
      "code": "SPH-102",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 382.5,
      "cy": 627.0,
      "entryX": 481.8,
      "entryY": 616.1,
      "node": 4,
      "isStairs": false
    },
    {
      "id": "room_gad_office",
      "name": "GAD-PR Office",
      "code": "GAD-103",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 415.5,
      "cy": 702.0,
      "entryX": 423.4,
      "entryY": 749.4,
      "node": 94,
      "isStairs": false
    },
    {
      "id": "room_admin_block_a",
      "name": "Entrance",
      "code": "ADM-BLK-A",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 384.0,
      "cy": 834.5,
      "entryX": 384.0,
      "entryY": 900.0,
      "node": 97,
      "isStairs": false
    },
    {
      "id": "room_admission_office",
      "name": "Admission Office",
      "code": "ADM-105",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 670.0,
      "cy": 659.5,
      "entryX": 676.9,
      "entryY": 714.1,
      "node": 22,
      "isStairs": false
    },
    {
      "id": "room_cir_seminar",
      "name": "CIR Seminar Room",
      "code": "CIR-106",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 861.5,
      "cy": 636.5,
      "entryX": 868.0,
      "entryY": 692.4,
      "node": 24,
      "isStairs": false
    },
    {
      "id": "room_guest_room",
      "name": "Guest Room",
      "code": "GST-107",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 700.5,
      "cy": 937.5,
      "entryX": 694.0,
      "entryY": 886.3,
      "node": 37,
      "isStairs": false
    },
    {
      "id": "room_mini_conf",
      "name": "Mini Conference Room",
      "code": "CONF-MINI",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 443.5,
      "cy": 954.0,
      "entryX": 443.5,
      "entryY": 900.0,
      "node": 98,
      "isStairs": false
    },
    {
      "id": "room_main_conf",
      "name": "Main Conference Room",
      "code": "CONF-MAIN",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 433.5,
      "cy": 1031.5,
      "entryX": 526.3,
      "entryY": 1021.6,
      "node": 17,
      "isStairs": false
    },
    {
      "id": "room_acharya_hall",
      "name": "Acharya Hall",
      "code": "ACH-110",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 606.5,
      "cy": 1157.0,
      "entryX": 599.9,
      "entryY": 1088.3,
      "node": 83,
      "isStairs": false
    },
    {
      "id": "room_stationery",
      "name": "Stationery & Courier",
      "code": "STN-111",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 827.0,
      "cy": 1138.5,
      "entryX": 819.7,
      "entryY": 1058.2,
      "node": 100,
      "isStairs": false
    },
    {
      "id": "room_mfg_lab",
      "name": "Manufacturing Lab",
      "code": "LAB-MFG",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 958.0,
      "cy": 1125.5,
      "entryX": 950.8,
      "entryY": 1046.3,
      "node": 56,
      "isStairs": false
    },
    {
      "id": "room_mat_testing",
      "name": "Material Testing Lab",
      "code": "LAB-MTL",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1102.5,
      "cy": 1110.5,
      "entryX": 1095.5,
      "entryY": 1033.1,
      "node": 104,
      "isStairs": false
    },
    {
      "id": "room_wireless_ctr",
      "name": "Amrita Center for Wireless Networks & Apps",
      "code": "ACWNA",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1015.5,
      "cy": 473.0,
      "entryX": 949.5,
      "entryY": 480.9,
      "node": 71,
      "isStairs": false
    },
    {
      "id": "room_courtyard_west",
      "name": "Courtyard (West)",
      "code": "CYD-WEST",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 723.5,
      "cy": 795.5,
      "entryX": 734.4,
      "entryY": 881.2,
      "node": 38,
      "isStairs": false
    },
    {
      "id": "room_courtyard_central",
      "name": "Courtyard (Central)",
      "code": "CYD-CTR",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1157.0,
      "cy": 745.5,
      "entryX": 1147.6,
      "entryY": 660.0,
      "node": 26,
      "isStairs": false
    },
    {
      "id": "room_director_dean",
      "name": "Director / Associate Dean",
      "code": "DIR-OFFICE",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1184.5,
      "cy": 885.0,
      "entryX": 1178.5,
      "entryY": 830.8,
      "node": 41,
      "isStairs": false
    },
    {
      "id": "room_ladies_infirmary",
      "name": "Ladies Infirmary",
      "code": "INF-118",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1345.0,
      "cy": 866.0,
      "entryX": 1340.0,
      "entryY": 812.2,
      "node": 44,
      "isStairs": false
    },
    {
      "id": "room_metallurgy",
      "name": "Metallurgy Laboratory",
      "code": "LAB-MET",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1239.5,
      "cy": 386.5,
      "entryX": 1247.9,
      "entryY": 455.4,
      "node": 75,
      "isStairs": false
    },
    {
      "id": "room_fluid_mech",
      "name": "Fluid Mechanics Lab",
      "code": "LAB-FML",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1339.5,
      "cy": 374.0,
      "entryX": 1348.1,
      "entryY": 444.1,
      "node": 77,
      "isStairs": false
    },
    {
      "id": "room_cae_cell",
      "name": "C.A.E. Cell",
      "code": "CAE-121",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1434.0,
      "cy": 363.5,
      "entryX": 1441.4,
      "entryY": 433.9,
      "node": 79,
      "isStairs": false
    },
    {
      "id": "room_dynamics_lab",
      "name": "Machine Dynamics Lab",
      "code": "LAB-MDL",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1498.5,
      "cy": 355.5,
      "entryX": 1506.7,
      "entryY": 426.4,
      "node": 80,
      "isStairs": false
    },
    {
      "id": "room_math_dept",
      "name": "Department of Mathematics",
      "code": "MATH-DEPT",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1522.5,
      "cy": 563.5,
      "entryX": 1528.6,
      "entryY": 616.9,
      "node": 32,
      "isStairs": false
    },
    {
      "id": "room_elec_machines",
      "name": "Electrical Machines Lab",
      "code": "LAB-EML",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1745.5,
      "cy": 528.0,
      "entryX": 1752.8,
      "entryY": 591.4,
      "node": 35,
      "isStairs": false
    },
    {
      "id": "room_prayer_hall",
      "name": "Prayer Hall",
      "code": "PRY-125",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1907.5,
      "cy": 509.5,
      "entryX": 1914.7,
      "entryY": 572.9,
      "node": 36,
      "isStairs": false
    },
    {
      "id": "room_courtyard_east",
      "name": "Courtyard (East)",
      "code": "CYD-EAST",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1463.0,
      "cy": 710.0,
      "entryX": 1453.4,
      "entryY": 625.5,
      "node": 31,
      "isStairs": false
    },
    {
      "id": "room_college_admin",
      "name": "College Administration Office",
      "code": "CADM-127",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1554.5,
      "cy": 844.0,
      "entryX": 1548.0,
      "entryY": 788.4,
      "node": 47,
      "isStairs": false
    },
    {
      "id": "room_computer_lab",
      "name": "Computer Lab",
      "code": "LAB-CS",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1763.5,
      "cy": 831.5,
      "entryX": 1755.8,
      "entryY": 764.4,
      "node": 49,
      "isStairs": false
    },
    {
      "id": "room_nanotech_lab",
      "name": "Nanotech Lab",
      "code": "LAB-NANO",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1926.5,
      "cy": 812.0,
      "entryX": 1918.8,
      "entryY": 745.6,
      "node": 51,
      "isStairs": false
    },
    {
      "id": "room_mech_workshop",
      "name": "Mechanical Workshop",
      "code": "LAB-MECH",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1351.0,
      "cy": 1074.5,
      "entryX": 1344.8,
      "entryY": 1011.8,
      "node": 107,
      "isStairs": false
    },
    {
      "id": "room_robotics_lab",
      "name": "CNC Robotics & Autom. Lab",
      "code": "LAB-ROBO",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1448.5,
      "cy": 1063.0,
      "entryX": 1441.6,
      "entryY": 1001.3,
      "node": 108,
      "isStairs": false
    },
    {
      "id": "room_wind_tunnel",
      "name": "Wind Tunnel",
      "code": "LAB-WIND",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1547.5,
      "cy": 1052.5,
      "entryX": 1541.0,
      "entryY": 990.3,
      "node": 109,
      "isStairs": false
    },
    {
      "id": "room_1790266501061",
      "name": "M Tech (Fluid Lab )",
      "code": "LAB-FLUID",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1007.5,
      "cy": 388.5,
      "entryX": 939.5,
      "entryY": 396.0,
      "node": 70,
      "isStairs": false
    },
    {
      "id": "room_1790266683270",
      "name": "Room 36",
      "code": "R-136",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 991.0,
      "cy": 254.0,
      "entryX": 924.7,
      "entryY": 261.3,
      "node": 68,
      "isStairs": false
    },
    {
      "id": "room_1790267011208",
      "name": "Principal Arts and Sciences",
      "code": "Arts and Science",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1279.0,
      "cy": 870.5,
      "entryX": 1272.8,
      "entryY": 819.9,
      "node": 42,
      "isStairs": false
    },
    {
      "id": "room_1790267197118",
      "name": "Conference Room",
      "code": "Conference",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1394.5,
      "cy": 861.5,
      "entryX": 1388.4,
      "entryY": 806.6,
      "node": 45,
      "isStairs": false
    },
    {
      "id": "room_1790267337608",
      "name": "AUMS Web Services",
      "code": "AUMS",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 797.0,
      "cy": 927.5,
      "entryX": 791.4,
      "entryY": 875.1,
      "node": 39,
      "isStairs": false
    },
    {
      "id": "room_1790267611764",
      "name": "Amritheswari Hall ",
      "code": "AMH-101",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 531.5,
      "cy": 464.0,
      "entryX": 540.8,
      "entryY": 537.6,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "room_1790267932589",
      "name": "Students Affair",
      "code": "SA",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1152.0,
      "cy": 604.5,
      "entryX": 1158.0,
      "entryY": 658.8,
      "node": 26,
      "isStairs": false
    },
    {
      "id": "room_1790267966500",
      "name": "Reserve",
      "code": "",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1249.0,
      "cy": 592.5,
      "entryX": 1255.2,
      "entryY": 648.1,
      "node": 28,
      "isStairs": false
    },
    {
      "id": "room_1790268001235",
      "name": "Principal",
      "code": "",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1343.0,
      "cy": 580.5,
      "entryX": 1349.1,
      "entryY": 637.7,
      "node": 30,
      "isStairs": false
    },
    {
      "id": "room_1790268898290",
      "name": "Courtyard (Far East) ",
      "code": "CYD-Far EAST",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1790.0,
      "cy": 674.5,
      "entryX": 1799.8,
      "entryY": 759.3,
      "node": 49,
      "isStairs": false
    },
    {
      "id": "room_1790578035647",
      "name": "Stairs",
      "code": "R-145",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1369.0,
      "cy": 476.5,
      "entryX": 1365.2,
      "entryY": 442.1,
      "node": 77,
      "isStairs": true,
      "stairColId": "STAIR-NE"
    },
    {
      "id": "room_1790578073580",
      "name": "Stairs",
      "code": "R-146",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 930.0,
      "cy": 1020.0,
      "entryX": 932.5,
      "entryY": 1048.0,
      "node": 102,
      "isStairs": true,
      "stairColId": "STAIR-CS"
    },
    {
      "id": "room_1790578100156",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1210.0,
      "cy": 1080.0,
      "entryX": 1204.8,
      "entryY": 1023.2,
      "node": 105,
      "isStairs": false
    },
    {
      "id": "room_1790578145285",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1677.0,
      "cy": 1060.0,
      "entryX": 1656.0,
      "entryY": 1022.0,
      "node": 61,
      "isStairs": false
    },
    {
      "id": "room_1790578197842",
      "name": "Ladies' Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 480.0,
      "cy": 1093.5,
      "entryX": 533.7,
      "entryY": 1087.3,
      "node": 19,
      "isStairs": false
    },
    {
      "id": "room_1790578250255",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 425.5,
      "cy": 553.5,
      "entryX": 474.2,
      "entryY": 548.1,
      "node": 2,
      "isStairs": false
    },
    {
      "id": "room_1790578281913",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 867.0,
      "cy": 118.5,
      "entryX": 871.5,
      "entryY": 158.4,
      "node": 73,
      "isStairs": false
    },
    {
      "id": "room_1790578307230",
      "name": "Men's Toilet",
      "code": "WC",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1594.0,
      "cy": 324.0,
      "entryX": 1580.0,
      "entryY": 360.0,
      "node": 90,
      "isStairs": false
    },
    {
      "id": "room_1790578386471",
      "name": "Stairs",
      "code": "R-152",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 890.0,
      "cy": 330.0,
      "entryX": 850.7,
      "entryY": 334.3,
      "node": 64,
      "isStairs": true,
      "stairColId": "STAIR-N"
    },
    {
      "id": "room_1790578435142",
      "name": "Stairs",
      "code": "R-153",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 989.0,
      "cy": 764.5,
      "entryX": 947.9,
      "entryY": 769.1,
      "node": 53,
      "isStairs": true,
      "stairColId": "STAIR-CTR"
    },
    {
      "id": "room_1790578489388",
      "name": "Stairs",
      "code": "R-154",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 1660.0,
      "cy": 689.5,
      "entryX": 1619.1,
      "entryY": 694.3,
      "node": 59,
      "isStairs": true,
      "stairColId": "STAIR-E"
    },
    {
      "id": "room_1790578512841",
      "name": "Stairs",
      "code": "R-155",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 572.0,
      "cy": 940.0,
      "entryX": 567.7,
      "entryY": 900.1,
      "node": 13,
      "isStairs": true,
      "stairColId": "STAIR-SW"
    },
    {
      "id": "room_1790578548474",
      "name": "Stairs",
      "code": "R-156",
      "floor": "ground",
      "floorIdx": 0,
      "floorTitle": "Ground Floor",
      "cx": 537.0,
      "cy": 690.0,
      "entryX": 541.4,
      "entryY": 729.5,
      "node": 8,
      "isStairs": true,
      "stairColId": "STAIR-NW"
    }
  ]
};


class CampusRouter {
  constructor(data) {
    this.data = data;
    this.scale = data.scaleMetersPerPixel || 0.15;
    this.walkingSpeed = data.avgWalkingSpeedMps || 1.25;
    this.stairPenaltyMeters = data.stairPenaltyMeters || 15.0;
    this.floors = data.floors;
    this.floorKeys = ['ground', 'first', 'second', 'third'];
    this.floorIndices = { ground: 0, first: 1, second: 2, third: 3 };

    // Index all rooms
    this.roomsMap = new Map();
    this.data.allRooms.forEach(r => this.roomsMap.set(r.id, r));

    // Per-floor adjacency
    this.adjPerFloor = {};
    for (const fKey of this.floorKeys) {
      const fData = this.floors[fKey];
      const adj = new Map();
      for (let i = 0; i < fData.nodes.length; i++) {
        adj.set(i, new Map());
      }
      for (const e of fData.edges) {
        adj.get(e.u).set(e.v, e.dist);
        adj.get(e.v).set(e.u, e.dist);
      }
      this.adjPerFloor[fKey] = adj;
    }

    // Unified multi-floor graph
    this.unifiedAdj = new Map();
    for (let fIdx = 0; fIdx < 4; fIdx++) {
      const fKey = this.floorKeys[fIdx];
      const fData = this.floors[fKey];
      for (let i = 0; i < fData.nodes.length; i++) {
        this.unifiedAdj.set(`${fIdx}_${i}`, new Map());
      }
    }

    // Intra-floor edges
    for (let fIdx = 0; fIdx < 4; fIdx++) {
      const fKey = this.floorKeys[fIdx];
      for (const e of this.floors[fKey].edges) {
        const uKey = `${fIdx}_${e.u}`;
        const vKey = `${fIdx}_${e.v}`;
        this.unifiedAdj.get(uKey).set(vKey, e.dist);
        this.unifiedAdj.get(vKey).set(uKey, e.dist);
      }
    }

    // Inter-floor stair links between adjacent floors
    const stairDistPx = this.stairPenaltyMeters / this.scale;
    for (let fIdx = 0; fIdx < 3; fIdx++) {
      const fKey1 = this.floorKeys[fIdx];
      const fKey2 = this.floorKeys[fIdx + 1];
      for (const col of this.data.stairColumns) {
        const s1 = this.floors[fKey1].stairs[col.id];
        const s2 = this.floors[fKey2].stairs[col.id];
        if (s1 && s2) {
          const k1 = `${fIdx}_${s1.node}`;
          const k2 = `${fIdx + 1}_${s2.node}`;
          this.unifiedAdj.get(k1).set(k2, stairDistPx);
          this.unifiedAdj.get(k2).set(k1, stairDistPx);
        }
      }
    }
  }

  dist(p1, p2) {
    const dx = p1[0] - p2[0];
    const dy = p1[1] - p2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  pointToSegmentDist(p, a, b) {
    const abx = b[0] - a[0];
    const aby = b[1] - a[1];
    const abl2 = abx * abx + aby * aby;
    if (abl2 < 1e-6) {
      return { dist: this.dist(p, a), proj: a };
    }
    let t = ((p[0] - a[0]) * abx + (p[1] - a[1]) * aby) / abl2;
    t = Math.max(0, Math.min(1, t));
    const proj = [a[0] + t * abx, a[1] + t * aby];
    return { dist: this.dist(p, proj), proj };
  }

  findNearestCorridorPoint(floorKey, x, y) {
    const fData = this.floors[floorKey] || this.floors['ground'];
    let bestDist = Infinity;
    let bestProj = [x, y];
    let nearestNode = 0;

    for (const edge of fData.edges) {
      const uPt = fData.nodes[edge.u];
      const vPt = fData.nodes[edge.v];
      const res = this.pointToSegmentDist([x, y], uPt, vPt);
      if (res.dist < bestDist) {
        bestDist = res.dist;
        bestProj = res.proj;
      }
    }

    let minNodeDist = Infinity;
    for (let i = 0; i < fData.nodes.length; i++) {
      const d = this.dist([x, y], fData.nodes[i]);
      if (d < minNodeDist) {
        minNodeDist = d;
        nearestNode = i;
      }
    }

    return { proj: bestProj, dist: bestDist, nearestNode };
  }

  resolveTarget(target, defaultFloor = 'ground') {
    if (typeof target === 'string') {
      const room = this.roomsMap.get(target);
      if (room) {
        return {
          id: room.id,
          name: room.name,
          code: room.code,
          floor: room.floor,
          floorIdx: room.floorIdx,
          floorTitle: room.floorTitle,
          x: room.cx,
          y: room.cy,
          entryX: room.entryX,
          entryY: room.entryY,
          node: room.node,
          isRoom: true,
          isStairs: room.isStairs,
          stairColId: room.stairColId
        };
      }
    } else if (target && typeof target === 'object') {
      const floorKey = target.floor || defaultFloor || 'ground';
      const fIdx = this.floorIndices[floorKey] !== undefined ? this.floorIndices[floorKey] : 0;
      const x = target.x;
      const y = target.y;
      const nearest = this.findNearestCorridorPoint(floorKey, x, y);
      return {
        id: 'gps_location',
        name: target.name || 'Current Location',
        code: 'GPS',
        floor: floorKey,
        floorIdx: fIdx,
        floorTitle: this.floors[floorKey].title,
        x,
        y,
        entryX: nearest.proj[0],
        entryY: nearest.proj[1],
        node: nearest.nearestNode,
        isRoom: false,
        isStairs: false
      };
    }
    return null;
  }

  findRoute(originTarget, destTarget, currentFloor = 'ground') {
    const origin = this.resolveTarget(originTarget, currentFloor);
    const dest = this.resolveTarget(destTarget, currentFloor);

    if (!origin || !dest) {
      return { success: false, error: 'Invalid start or destination location' };
    }

    if (origin.id === dest.id) {
      return {
        success: true,
        isMultiFloor: false,
        origin,
        dest,
        totalDistanceMeters: 0,
        timeFormatted: '0 min',
        floorSegments: [
          {
            floor: origin.floor,
            floorIdx: origin.floorIdx,
            points: [[origin.x, origin.y]],
            distanceMeters: 0,
            instruction: `You are at ${origin.name}`
          }
        ],
        floorPaths: {
          ground: origin.floor === 'ground' ? [[origin.x, origin.y]] : [],
          first: origin.floor === 'first' ? [[origin.x, origin.y]] : [],
          second: origin.floor === 'second' ? [[origin.x, origin.y]] : [],
          third: origin.floor === 'third' ? [[origin.x, origin.y]] : []
        },
        floorsInRoute: [origin.floor],
        stairTransitions: []
      };
    }

    // Unified Dijkstra
    const startKey = `${origin.floorIdx}_${origin.node}`;
    const destKey = `${dest.floorIdx}_${dest.node}`;

    const distMap = new Map();
    const prevMap = new Map();
    const visited = new Set();
    const pq = [{ key: startKey, d: 0 }];
    distMap.set(startKey, 0);

    while (pq.length > 0) {
      let minIdx = 0;
      for (let i = 1; i < pq.length; i++) {
        if (pq[i].d < pq[minIdx].d) minIdx = i;
      }
      const { key: u, d: currentDist } = pq.splice(minIdx, 1)[0];
      if (visited.has(u)) continue;
      visited.add(u);
      if (u === destKey) break;

      const neighbors = this.unifiedAdj.get(u);
      if (!neighbors) continue;

      for (const [v, weight] of neighbors) {
        if (visited.has(v)) continue;
        const newDist = currentDist + weight;
        if (!distMap.has(v) || newDist < distMap.get(v)) {
          distMap.set(v, newDist);
          prevMap.set(v, u);
          pq.push({ key: v, d: newDist });
        }
      }
    }

    if (!distMap.has(destKey)) {
      return { success: false, error: 'No walkable path found between selected locations' };
    }

    // Reconstruct full node key path: e.g. ['0_12', '0_15', ..., '1_44', ...]
    const fullKeyPath = [];
    let curr = destKey;
    while (curr) {
      fullKeyPath.unshift(curr);
      curr = prevMap.get(curr);
    }

    // Break node path into consecutive floor legs
    const legs = [];
    let currentLeg = null;

    for (let i = 0; i < fullKeyPath.length; i++) {
      const parts = fullKeyPath[i].split('_');
      const fIdx = parseInt(parts[0], 10);
      const localNode = parseInt(parts[1], 10);

      if (!currentLeg || currentLeg.floorIdx !== fIdx) {
        if (currentLeg) legs.push(currentLeg);
        currentLeg = {
          floorIdx: fIdx,
          floorKey: this.floorKeys[fIdx],
          nodes: [localNode]
        };
      } else {
        currentLeg.nodes.push(localNode);
      }
    }
    if (currentLeg) legs.push(currentLeg);

    // Build per-floor coordinates and detect stair transitions between legs
    const floorPaths = {
      ground: [],
      first: [],
      second: [],
      third: []
    };
    const floorSegments = [];
    const stairTransitions = [];
    let totalCorridorPx = 0;
    let stairFlightCount = 0;

    for (let legIdx = 0; legIdx < legs.length; legIdx++) {
      const leg = legs[legIdx];
      const fKey = leg.floorKey;
      const fIdx = leg.floorIdx;
      const fNodes = this.floors[fKey].nodes;
      const legPoints = [];

      const isFirstLeg = (legIdx === 0);
      const isLastLeg = (legIdx === legs.length - 1);

      // Start of leg
      if (isFirstLeg) {
        legPoints.push([origin.x, origin.y]);
        if (origin.entryX !== origin.x || origin.entryY !== origin.y) {
          legPoints.push([origin.entryX, origin.entryY]);
        }
      } else {
        // Entering from stairs of previous leg
        const prevLeg = legs[legIdx - 1];
        const transitionStairCol = this.findConnectingStair(prevLeg.floorKey, fKey, prevLeg.nodes[prevLeg.nodes.length - 1], leg.nodes[0]);
        const stairData = transitionStairCol ? this.floors[fKey].stairs[transitionStairCol.id] : null;
        if (stairData) {
          legPoints.push([stairData.cx, stairData.cy]);
          legPoints.push([stairData.entryX, stairData.entryY]);
        }
      }

      // Corridor nodes on this floor
      for (const nIdx of leg.nodes) {
        const pt = fNodes[nIdx];
        const last = legPoints[legPoints.length - 1];
        if (!last || this.dist(last, pt) > 1.0) {
          legPoints.push(pt);
        }
      }

      // End of leg
      if (isLastLeg) {
        if (dest.entryX !== dest.x || dest.entryY !== dest.y) {
          legPoints.push([dest.entryX, dest.entryY]);
        }
        legPoints.push([dest.x, dest.y]);
      } else {
        // Exiting to stairs for next leg
        const nextLeg = legs[legIdx + 1];
        const transitionStairCol = this.findConnectingStair(fKey, nextLeg.floorKey, leg.nodes[leg.nodes.length - 1], nextLeg.nodes[0]);
        const stairData = transitionStairCol ? this.floors[fKey].stairs[transitionStairCol.id] : null;
        if (stairData) {
          legPoints.push([stairData.entryX, stairData.entryY]);
          legPoints.push([stairData.cx, stairData.cy]);
        }
      }

      // Calculate leg distance
      let legDistPx = 0;
      for (let k = 0; k < legPoints.length - 1; k++) {
        legDistPx += this.dist(legPoints[k], legPoints[k + 1]);
      }
      totalCorridorPx += legDistPx;
      const legDistMeters = Math.round(legDistPx * this.scale);

      // Save to floorPaths
      floorPaths[fKey] = legPoints;

      // Add leg segment description
      const legTitle = this.floors[fKey].title;
      let instruction = '';
      if (isFirstLeg && isLastLeg) {
        instruction = `Walk directly on ${legTitle} to ${dest.name}`;
      } else if (isFirstLeg) {
        const nextLeg = legs[1];
        const stairCol = this.findConnectingStair(fKey, nextLeg.floorKey, leg.nodes[leg.nodes.length - 1], nextLeg.nodes[0]);
        const stairName = stairCol ? stairCol.name : 'Stairs';
        instruction = `Walk on ${legTitle} to ${stairName}`;
      } else if (isLastLeg) {
        instruction = `Walk on ${legTitle} to destination (${dest.name})`;
      } else {
        const nextLeg = legs[legIdx + 1];
        const stairCol = this.findConnectingStair(fKey, nextLeg.floorKey, leg.nodes[leg.nodes.length - 1], nextLeg.nodes[0]);
        const stairName = stairCol ? stairCol.name : 'Stairs';
        instruction = `Walk across ${legTitle} to ${stairName}`;
      }

      floorSegments.push({
        type: 'floor_walk',
        floor: fKey,
        floorIdx: fIdx,
        floorTitle: legTitle,
        points: legPoints,
        distanceMeters: legDistMeters,
        instruction
      });

      // Record stair transition between legs
      if (!isLastLeg) {
        const nextLeg = legs[legIdx + 1];
        const stairCol = this.findConnectingStair(fKey, nextLeg.floorKey, leg.nodes[leg.nodes.length - 1], nextLeg.nodes[0]);
        const stairName = stairCol ? stairCol.name : 'Stairs';
        const fromTitle = this.floors[fKey].title;
        const toTitle = this.floors[nextLeg.floorKey].title;
        const direction = nextLeg.floorIdx > fIdx ? 'up' : 'down';
        const stairExitPos = stairCol ? this.floors[nextLeg.floorKey].stairs[stairCol.id] : null;

        stairFlightCount++;
        const transition = {
          type: 'stair_transition',
          stairColId: stairCol ? stairCol.id : 'STAIRS',
          stairName,
          direction,
          fromFloor: fKey,
          toFloor: nextLeg.floorKey,
          fromFloorTitle: fromTitle,
          toFloorTitle: toTitle,
          instruction: `Take ${stairName} ${direction} to ${toTitle}`,
          stairPos: stairExitPos ? { x: stairExitPos.cx, y: stairExitPos.cy, entryX: stairExitPos.entryX, entryY: stairExitPos.entryY } : null
        };
        stairTransitions.push(transition);
        floorSegments.push(transition);
      }
    }

    const totalDistanceMeters = Math.round(totalCorridorPx * this.scale + stairFlightCount * this.stairPenaltyMeters);
    const timeSec = Math.round(totalDistanceMeters / this.walkingSpeed);
    const minutes = Math.floor(timeSec / 60);
    const seconds = timeSec % 60;
    const timeFormatted = minutes > 0 ? (`${minutes} min` + (seconds > 0 ? ` ${seconds}s` : '')) : `${seconds} sec`;

    const floorsInRoute = legs.map(l => l.floorKey);

    return {
      success: true,
      isMultiFloor: legs.length > 1,
      origin,
      dest,
      points: floorPaths[origin.floorKey] || (floorsInRoute[0] ? floorPaths[floorsInRoute[0]] : []),
      totalDistanceMeters,
      timeFormatted,
      timeSeconds: timeSec,
      floorSegments,
      floorPaths,
      floorsInRoute,
      stairTransitions
    };
  }

  findConnectingStair(fKey1, fKey2, node1, node2) {
    for (const col of this.data.stairColumns) {
      const s1 = this.floors[fKey1].stairs[col.id];
      const s2 = this.floors[fKey2].stairs[col.id];
      if (s1 && s2 && s1.node === node1 && s2.node === node2) {
        return col;
      }
    }
    for (const col of this.data.stairColumns) {
      const s1 = this.floors[fKey1].stairs[col.id];
      if (s1 && s1.node === node1) {
        return col;
      }
    }
    return null;
  }
}

// Courtyard locations are non-selectable and excluded from navigation
const isCourtyardRoom = (r) => r.id.toLowerCase().includes('courtyard') || r.name.toLowerCase().includes('courtyard') || (r.code && r.code.toLowerCase().includes('cyd'));
if (CAMPUS_DATA_PLACEHOLDER.floors && CAMPUS_DATA_PLACEHOLDER.floors.ground && CAMPUS_DATA_PLACEHOLDER.floors.ground.rooms) {
  CAMPUS_DATA_PLACEHOLDER.floors.ground.rooms = CAMPUS_DATA_PLACEHOLDER.floors.ground.rooms.filter(r => !isCourtyardRoom(r));
}
if (CAMPUS_DATA_PLACEHOLDER.allRooms) {
  CAMPUS_DATA_PLACEHOLDER.allRooms = CAMPUS_DATA_PLACEHOLDER.allRooms.filter(r => !isCourtyardRoom(r));
}
if (CAMPUS_DATA_PLACEHOLDER.rooms) {
  CAMPUS_DATA_PLACEHOLDER.rooms = CAMPUS_DATA_PLACEHOLDER.rooms.filter(r => !isCourtyardRoom(r));
}

window.CampusRouter = CampusRouter;
window.GroundRouter = CampusRouter;
window.CAMPUS_NAV_DATA = CAMPUS_DATA_PLACEHOLDER;
window.GROUND_NAV_DATA = window.CAMPUS_NAV_DATA;

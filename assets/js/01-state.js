/** ================================
 *  State
 *  ================================ */
const photo = document.getElementById("photo");
const overlay = document.getElementById("overlay");
const ctx = overlay.getContext("2d");

const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const abEl = document.getElementById("abResult");
const scaleBadge = document.getElementById("scaleBadge");
const zoomBadge = document.getElementById("zoomBadge");

let mode = null;               // 'calibration' | 'measure'
let currentType = null;        // 'H' | 'L' | custom
let pendingPoints = [];        // two clicks in image coords
let measurements = {};         // { H: {p1,p2}, L: {p1,p2}, ... } points in IMAGE coords
let scaleMMperPx = null;       // mm / px (image pixel)
let zoom = 1.0;                // viewport transform
let drag = { active:false, kind:null, id:null, which:null, index:null }; // drag landmark endpoint

// AI landmarks cache (in image coords)
let aiPoints = []; // array of {x,y,label}

// AI-derived guides (in IMAGE coords)
let guides = {
  midline: null,      // {p1:{x,y}, p2:{x,y}}
  eyeline: null,      // {p1:{x,y}, p2:{x,y}}
  thirds: null        // {topY, glabellaY, subnasaleY, chinY}
};

// Manual anthropometry anchor: Trichion (hairline midline point), in IMAGE coords
let trichionPoint = null;

let aiMetrics = null; // computed metrics

// Planning annotations (in IMAGE coords)
let planItems = []; // {id,type,label,p1,p2,px,mm,deg,p3?}

// Zones (polygons) for planning: {id,label,side,points:[{x,y},...], liftTo:{x,y}}
let planZones = [];

// Selection for plan operations
let selectedPlan = null; // {kind:"plan"|"zone", id}

// Before/After snapshot
let beforeSnapshot = null; // {planItems, planZones, ts}
let showBefore = false;

let planMode = null; // "vector" | "tilt" | "angle3" | "measure"
let planPending = [];
let aiPickMode = false; // choose points from AI dots
let aiPickPending = [];

// For presets: keep full keypoints from the last AI detection
let lastAIKeypoints = null; // array


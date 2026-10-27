export enum TabId {
  Map = 'map-overview',
  Readiness = 'readiness',
  Incidents = 'incidents',
  Events = 'events',
  Properties = 'properties',
}

export type AssetCategory = 'mixed' | 'office' | 'convention';

export interface CoreVital {
  label: string;
  value: string;
  tone?: 'default' | 'green' | 'blue' | 'amber';
}

export interface DrawerTelemetryRow {
  label: string;
  value: string;
  tone?: 'default' | 'green' | 'blue' | 'amber';
}

export interface PropertyAsset {
  id: string;
  name: string;
  shortPinLabel: string;
  subtitle: string;
  mapCalloutSubtitle: string;
  category: AssetCategory;
  categoryLabel: string;
  readinessPct: number;
  statusBadge: string;
  statusTone: 'nominal' | 'peak' | 'caution';
  subsystemLabel: string;
  icon: string;
  mapIcon: string;
  pinLeftPct: number;
  pinTopPct: number;
  hasEventHighlight?: boolean;
  hasCautionAlert?: boolean;
  // Map callout metrics
  footfallFormatted: string;
  footfallDelta: string;
  coolingRate: string;
  coolingSub: string;
  elevatorsStatus: string;
  elevatorsSub: string;
  elevatorsSubTone?: 'green' | 'amber';
  // Readiness card vitals & drawer
  vitals: CoreVital[];
  cautionBanner?: string;
  drawerRows: DrawerTelemetryRow[];
  // Extended property directory specs
  gfaSqm: string;
  occupancyPct: number;
  certification: string;
  powerLoadMw: string;
  transitLink: string;
  cameraLabel: string;
  cameraZone: string;
}

export type IncidentStatus = 'active' | 'monitoring' | 'cleared';

export interface IncidentItem {
  id: string;
  assetId: string;
  assetName: string;
  icon: string;
  subtitle: string;
  status: IncidentStatus;
  badgeLabel: string;
  description: string;
  cameraUrl?: string;
  cameraAlt?: string;
  cameraBadge?: string;
  etaText?: string;
  crewText?: string;
  marshalsText?: string;
  activeAgoText?: string;
  occupancyBarPct?: number;
  footerLeftIcon?: string;
  footerLeftIconColor?: string;
  footerLeftText?: string;
  footerRightText?: string;
}

export interface ScheduledEventItem {
  id: string;
  assetId: string;
  venueHeader: string;
  zoneLabel: string;
  title: string;
  locationSub: string;
  impactLevel: 'high' | 'moderate' | 'normal';
  impactLabel: string;
  paxLabel: string;
  loadPct: number;
  loadStatusLabel: string;
  protocolIcon: string;
  protocolText: string;
  actionButtonLabel: string;
  footerIcon: string;
  footerText: string;
  timeRange: string;
  dayCodes: string[];
}

export interface DayHorizonItem {
  code: string;
  dayLabel: string;
  dateNum: string;
  dotColor: 'error' | 'secondary' | 'tertiary' | 'outline';
  footfallTotal: string;
  footfallDelta: string;
  advisoryTime: string;
  advisoryTitle: string;
  advisoryBody: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  tone: 'amber' | 'blue' | 'green';
  targetTab: TabId;
  unread: boolean;
}

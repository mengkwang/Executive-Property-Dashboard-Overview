import React, { useState } from 'react';
import { PropertyAsset, TabId } from '../types/portfolio';

interface MapOverviewScreenProps {
  assets: PropertyAsset[];
  selectedAssetId: string;
  onSelectAsset: (assetId: string) => void;
  sathornAcknowledged: boolean;
  onAcknowledgeSathorn: () => void;
  onNavigateTab: (tab: TabId) => void;
  onOpenCameraModal: (asset: PropertyAsset) => void;
  onOpenBmsModal: (asset: PropertyAsset) => void;
  onOpenLogHistory: () => void;
}

type MapFilterMode = 'all' | 'critical' | 'events';
type TransitFilter = 'all' | 'mrt' | 'bts' | 'none';

export const MapOverviewScreen: React.FC<MapOverviewScreenProps> = ({
  assets,
  selectedAssetId,
  onSelectAsset,
  sathornAcknowledged,
  onAcknowledgeSathorn,
  onNavigateTab,
  onOpenCameraModal,
  onOpenBmsModal,
  onOpenLogHistory,
}) => {
  const [segment, setSegment] = useState<MapFilterMode>('all');
  const [transitFilter, setTransitFilter] = useState<TransitFilter>('all');
  const [mapZoom, setMapZoom] = useState<number>(1);

  const selectedAsset =
    assets.find((a) => a.id === selectedAssetId) || assets[0];

  const handleSegmentChange = (mode: MapFilterMode) => {
    setSegment(mode);
    if (mode === 'critical') {
      onSelectAsset('sathorn-square');
    } else if (mode === 'events') {
      if (!selectedAsset.hasEventHighlight) {
        onSelectAsset('one-bangkok');
      }
    }
  };

  const cycleTransitFilter = () => {
    const order: TransitFilter[] = ['all', 'mrt', 'bts', 'none'];
    const nextIdx = (order.indexOf(transitFilter) + 1) % order.length;
    setTransitFilter(order[nextIdx]);
  };

  const transitFilterLabel =
    transitFilter === 'all'
      ? 'Filter Transit'
      : transitFilter === 'mrt'
      ? 'MRT Only'
      : transitFilter === 'bts'
      ? 'BTS Only'
      : 'Transit Off';

  const isPinVisibleForSegment = (asset: PropertyAsset) => {
    if (segment === 'critical') return Boolean(asset.hasCautionAlert);
    if (segment === 'events') return Boolean(asset.hasEventHighlight);
    return true;
  };

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 pb-8 gap-5 max-w-[1440px] mx-auto">
      {/* Top Executive Subheader & Timezone Indicator */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="text-[11px] leading-[14px] font-semibold uppercase tracking-[0.06em] text-on-surface-variant">
            Rama IV • Sathorn • Wireless District
          </span>
          <h2 className="text-[26px] leading-[32px] lg:text-[32px] lg:leading-[38px] font-semibold tracking-[-0.02em] text-on-surface">
            Portfolio Command
          </h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/90 shadow-sm backdrop-blur-md shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
          <span className="font-label-numeric text-[12px] leading-[16px] font-medium text-on-surface whitespace-nowrap">
            LIVE • 14:42 ICT
          </span>
        </div>
      </div>

      {/* iOS HIG Segmented Control */}
      <div className="p-1 rounded-xl bg-surface-container-highest/60 backdrop-blur-md flex items-center justify-between shadow-sm max-w-xl">
        <button
          type="button"
          onClick={() => handleSegmentChange('all')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[13px] leading-[18px] text-center transition-all whitespace-nowrap cursor-pointer ${
            segment === 'all'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface font-normal'
          }`}
        >
          All Assets (8)
        </button>
        <button
          type="button"
          onClick={() => handleSegmentChange('critical')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[13px] leading-[18px] text-center transition-all whitespace-nowrap cursor-pointer ${
            segment === 'critical'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface font-normal'
          }`}
        >
          Attention (1)
        </button>
        <button
          type="button"
          onClick={() => handleSegmentChange('events')}
          className={`flex-1 py-1.5 px-2 rounded-lg text-[13px] leading-[18px] text-center transition-all whitespace-nowrap cursor-pointer ${
            segment === 'events'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface font-normal'
          }`}
        >
          Key Events (4)
        </button>
      </div>

      {/* 1. Executive Quick Glance KPI Horizontal Carousel */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[17px] leading-[22px] text-on-surface font-semibold tracking-[-0.012em]">
            Telemetry Highlights
          </span>
          <button
            type="button"
            onClick={() => onNavigateTab(TabId.Readiness)}
            className="text-[11px] leading-[14px] uppercase text-primary font-semibold tracking-[0.06em] hover:underline cursor-pointer"
          >
            Unified Grid
          </button>
        </div>

        <div className="flex lg:grid lg:grid-cols-4 gap-2.5 overflow-x-auto pb-2 pt-1 -mx-4 px-4 lg:mx-0 lg:px-0 no-scrollbar snap-x snap-mandatory">
          {/* KPI 1: Readiness */}
          <button
            type="button"
            onClick={() => onNavigateTab(TabId.Readiness)}
            className="min-w-[158px] lg:min-w-0 flex-shrink-0 snap-start p-3.5 rounded-2xl bg-surface-container-lowest/85 hover:bg-surface-container-lowest backdrop-blur-xl shadow-sm flex flex-col justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-numeric text-[11px] font-semibold text-[#248a3d]">
                8/8 OK
              </span>
            </div>
            <div>
              <span className="text-[12px] leading-[16px] text-on-surface-variant block">
                Readiness
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[24px] leading-[30px] tracking-[-0.018em] font-semibold text-on-surface tabular-nums">
                  97.4%
                </span>
                <span className="font-label-numeric text-[11px] font-medium text-[#248a3d]">
                  +0.8%
                </span>
              </div>
            </div>
          </button>

          {/* KPI 2: Incidents */}
          <button
            type="button"
            onClick={() => onNavigateTab(TabId.Incidents)}
            className="min-w-[158px] lg:min-w-0 flex-shrink-0 snap-start p-3.5 rounded-2xl bg-surface-container-lowest/85 hover:bg-surface-container-lowest backdrop-blur-xl shadow-sm flex flex-col justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-8 h-8 rounded-full bg-error-container/60 flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[18px]">shield</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-error-container/70 font-label-numeric text-[11px] font-semibold text-error">
                0 Critical
              </span>
            </div>
            <div>
              <span className="text-[12px] leading-[16px] text-on-surface-variant block">
                Incidents
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[24px] leading-[30px] tracking-[-0.018em] font-semibold text-on-surface tabular-nums">
                  {sathornAcknowledged ? '0 Active' : '1 Minor'}
                </span>
                <span className="text-[11px] font-semibold text-on-surface-variant">
                  Elevator #4
                </span>
              </div>
            </div>
          </button>

          {/* KPI 3: Footfall */}
          <button
            type="button"
            onClick={() => onNavigateTab(TabId.Events)}
            className="min-w-[158px] lg:min-w-0 flex-shrink-0 snap-start p-3.5 rounded-2xl bg-surface-container-lowest/85 hover:bg-surface-container-lowest backdrop-blur-xl shadow-sm flex flex-col justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-8 h-8 rounded-full bg-primary-fixed/50 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">group</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed font-label-numeric text-[11px] font-semibold text-on-primary-fixed-variant">
                4 Events
              </span>
            </div>
            <div>
              <span className="text-[12px] leading-[16px] text-on-surface-variant block">
                Active Footfall
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-[24px] leading-[30px] tracking-[-0.018em] font-semibold text-on-surface tabular-nums">
                  62.4k
                </span>
                <span className="text-[11px] font-semibold text-on-surface-variant">
                  pax
                </span>
              </div>
            </div>
          </button>

          {/* KPI 4: HVAC / District Cooling */}
          <button
            type="button"
            onClick={() => onOpenBmsModal(selectedAsset)}
            className="min-w-[158px] lg:min-w-0 flex-shrink-0 snap-start p-3.5 rounded-2xl bg-surface-container-lowest/85 hover:bg-surface-container-lowest backdrop-blur-xl shadow-sm flex flex-col justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">ac_unit</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-numeric text-[11px] font-semibold text-on-surface">
                0.58 kW/RT
              </span>
            </div>
            <div>
              <span className="text-[12px] leading-[16px] text-on-surface-variant block">
                Cooling Plant
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-[24px] leading-[30px] tracking-[-0.018em] font-semibold text-on-surface tabular-nums">
                  94.2%
                </span>
                <span className="font-label-numeric text-[11px] font-semibold text-[#248a3d]">
                  Optimal
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Desktop 12-Col Split for Map + Dispatches; Stacked on Mobile */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* 2. Interactive Map View Card */}
        <div className="xl:col-span-7 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] leading-[22px] text-on-surface font-semibold tracking-[-0.012em]">
                Bangkok Prime Corridor
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-[11px] leading-[14px] text-on-primary-fixed font-semibold">
                GIS v2.4
              </span>
            </div>
            <button
              type="button"
              onClick={cycleTransitFilter}
              className="flex items-center gap-1 text-primary text-[12px] leading-[16px] font-medium hover:underline cursor-pointer min-h-[32px]"
            >
              <span className="material-symbols-outlined text-[16px]">layers</span>
              <span>{transitFilterLabel}</span>
            </button>
          </div>

          {/* Map Canvas Container */}
          <div className="relative w-full rounded-2xl bg-surface-container-low shadow-sm overflow-hidden p-2 flex flex-col gap-3">
            {/* Stylized Vector Corridor Schematic Map */}
            <div className="relative w-full h-80 sm:h-96 xl:h-[360px] rounded-xl bg-surface-container overflow-hidden shadow-inner flex items-center justify-center">
              <div
                className="relative w-full h-full transition-transform duration-200 ease-out"
                style={{ transform: `scale(${mapZoom})` }}
              >
                {/* Abstract Map Background Graphic (SVG Grid & Roads) */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-85"
                  fill="none"
                  viewBox="0 0 360 320"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Ambient Park Areas (Lumphini Park & Benjakitti) */}
                  <rect
                    fill="#e2f5e7"
                    height="75"
                    opacity="0.85"
                    rx="16"
                    width="105"
                    x="70"
                    y="70"
                  />
                  <text
                    fill="#2d6a4f"
                    fontFamily="Inter, sans-serif"
                    fontSize="8"
                    fontWeight="600"
                    opacity="0.65"
                    x="78"
                    y="90"
                  >
                    LUMPHINI PARK
                  </text>
                  <rect
                    fill="#e2f5e7"
                    height="110"
                    opacity="0.85"
                    rx="18"
                    width="115"
                    x="235"
                    y="145"
                  />
                  <text
                    fill="#2d6a4f"
                    fontFamily="Inter, sans-serif"
                    fontSize="8"
                    fontWeight="600"
                    opacity="0.65"
                    x="242"
                    y="165"
                  >
                    BENJAKITTI PARK
                  </text>

                  {/* Rama IV Road */}
                  <path
                    d="M-10 160 C90 155, 170 170, 370 200"
                    stroke="#c1c6d6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="14"
                  />
                  <path
                    d="M-10 160 C90 155, 170 170, 370 200"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                  <text
                    fill="#717785"
                    fontFamily="Inter, sans-serif"
                    fontSize="8"
                    fontWeight="600"
                    letterSpacing="1"
                    x="14"
                    y="152"
                  >
                    RAMA IV ROAD
                  </text>

                  {/* Sathorn Road */}
                  <path
                    d="M-10 240 L160 215"
                    stroke="#c1c6d6"
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                  <path
                    d="M-10 240 L160 215"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                  <text
                    fill="#717785"
                    fontFamily="Inter, sans-serif"
                    fontSize="7.5"
                    fontWeight="600"
                    x="10"
                    y="252"
                  >
                    SATHORN RD
                  </text>

                  {/* Silom Road */}
                  <path
                    d="M-10 195 L140 178"
                    stroke="#d5d8e3"
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                  <path
                    d="M-10 195 L140 178"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <text
                    fill="#717785"
                    fontFamily="Inter, sans-serif"
                    fontSize="7.5"
                    fontWeight="600"
                    x="10"
                    y="188"
                  >
                    SILOM RD
                  </text>

                  {/* Wireless / Witthayu Road */}
                  <path
                    d="M178 -10 L178 175"
                    stroke="#c1c6d6"
                    strokeLinecap="round"
                    strokeWidth="10"
                  />
                  <path
                    d="M178 -10 L178 175"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="5"
                  />
                  <text
                    fill="#717785"
                    fontFamily="Inter, sans-serif"
                    fontSize="7.5"
                    fontWeight="600"
                    x="184"
                    y="24"
                  >
                    WIRELESS RD
                  </text>

                  {/* Ratchadaphisek Road */}
                  <path
                    d="M260 330 L260 10"
                    stroke="#c1c6d6"
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                  <path
                    d="M260 330 L260 10"
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                  <text
                    fill="#717785"
                    fontFamily="Inter, sans-serif"
                    fontSize="7.5"
                    fontWeight="600"
                    x="268"
                    y="45"
                  >
                    RATCHADAPHISEK
                  </text>

                  {/* Transit Line Overlays: MRT Blue Line */}
                  {(transitFilter === 'all' || transitFilter === 'mrt') && (
                    <path
                      d="M-10 135 C80 148, 175 170, 258 205 L260 320"
                      stroke="#0071e3"
                      strokeDasharray="6 3"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  )}

                  {/* Transit Line Overlays: BTS Silom Line */}
                  {(transitFilter === 'all' || transitFilter === 'bts') && (
                    <path
                      d="M-10 230 L135 208 L175 140"
                      stroke="#00a86b"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  )}
                </svg>

                {/* Asset Map Pins & Hotspots */}
                {assets.map((asset) => {
                  const isSelected = asset.id === selectedAsset.id;
                  const matchesSegment = isPinVisibleForSegment(asset);

                  if (isSelected) {
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => onSelectAsset(asset.id)}
                        style={{
                          left: `${asset.pinLeftPct}%`,
                          top: `${asset.pinTopPct}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center cursor-pointer focus:outline-none"
                      >
                        <div className="relative flex items-center justify-center">
                          <span className="w-12 h-12 rounded-full bg-primary/20 animate-pulse absolute" />
                          <div className="w-10 h-10 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center ring-4 ring-white/90">
                            <span className="material-symbols-outlined text-[20px]">
                              {asset.mapIcon}
                            </span>
                          </div>
                        </div>
                        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold shadow tracking-wide uppercase whitespace-nowrap">
                          {asset.name} • Selected
                        </div>
                      </button>
                    );
                  }

                  const isCaution = asset.hasCautionAlert && !sathornAcknowledged;
                  const isQsncc = asset.id === 'qsncc';

                  return (
                    <button
                      key={asset.id}
                      type="button"
                      onClick={() => onSelectAsset(asset.id)}
                      style={{
                        left: `${asset.pinLeftPct}%`,
                        top: `${asset.pinTopPct}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer transition-opacity duration-200 focus:outline-none ${
                        matchesSegment ? 'opacity-100' : 'opacity-35 hover:opacity-90'
                      }`}
                    >
                      <div
                        className={`relative w-7 h-7 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isCaution
                            ? 'text-tertiary'
                            : isQsncc
                            ? 'text-secondary'
                            : 'text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          {asset.mapIcon}
                        </span>
                        {isCaution && (
                          <>
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-tertiary animate-ping" />
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-tertiary" />
                          </>
                        )}
                        {isQsncc && (
                          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary" />
                        )}
                      </div>
                      <span
                        className={`mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold shadow-sm whitespace-nowrap ${
                          isCaution
                            ? 'bg-tertiary-container text-on-tertiary-container'
                            : isQsncc
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-inverse-surface/85 text-inverse-on-surface'
                        }`}
                      >
                        {asset.shortPinLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Transit Badges Overlay */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
                {(transitFilter === 'all' || transitFilter === 'mrt') && (
                  <button
                    type="button"
                    onClick={() =>
                      setTransitFilter(transitFilter === 'mrt' ? 'all' : 'mrt')
                    }
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0071e3] text-on-primary shadow-sm font-label-numeric text-[11px] font-semibold cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>MRT Blue Line</span>
                  </button>
                )}
                {(transitFilter === 'all' || transitFilter === 'bts') && (
                  <button
                    type="button"
                    onClick={() =>
                      setTransitFilter(transitFilter === 'bts' ? 'all' : 'bts')
                    }
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#00a86b] text-on-primary shadow-sm font-label-numeric text-[11px] font-semibold cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>BTS Silom</span>
                  </button>
                )}
              </div>

              {/* Floating Map Quick Tools */}
              <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-1.5 z-20">
                <button
                  type="button"
                  aria-label="Zoom In"
                  onClick={() => setMapZoom((z) => Math.min(1.4, +(z + 0.15).toFixed(2)))}
                  className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow text-on-surface flex items-center justify-center hover:bg-surface-container-lowest active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <button
                  type="button"
                  aria-label="Zoom Out"
                  onClick={() => setMapZoom((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))}
                  className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow text-on-surface flex items-center justify-center hover:bg-surface-container-lowest active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <button
                  type="button"
                  aria-label="Reset Corridor View"
                  onClick={() => {
                    setMapZoom(1);
                    setTransitFilter('all');
                    onSelectAsset('one-bangkok');
                  }}
                  className="w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow text-on-surface flex items-center justify-center hover:bg-surface-container-lowest active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">my_location</span>
                </button>
              </div>
            </div>

            {/* Selected Asset Callout Card */}
            <div className="w-full p-3.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-xl shadow-sm flex flex-col gap-3">
              {/* Asset Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">
                      {selectedAsset.mapIcon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-[17px] leading-[22px] font-semibold text-on-surface tracking-[-0.012em]">
                        {selectedAsset.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full font-label-numeric text-[11px] font-semibold ${
                          selectedAsset.statusTone === 'caution'
                            ? 'bg-[#ff9500]/15 text-[#c97700]'
                            : selectedAsset.statusTone === 'peak'
                            ? 'bg-[#0071e3]/15 text-[#0071e3]'
                            : 'bg-[#34c759]/15 text-[#248a3d]'
                        }`}
                      >
                        {selectedAsset.statusBadge}
                      </span>
                    </div>
                    <span className="text-[12px] leading-[16px] text-on-surface-variant block truncate">
                      {selectedAsset.mapCalloutSubtitle}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Inspect Property Details"
                  onClick={() => onOpenBmsModal(selectedAsset)}
                  className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_full</span>
                </button>
              </div>

              {/* Telemetry Badges Grid */}
              <div className="grid grid-cols-3 gap-2 py-0.5">
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="text-[11px] leading-[14px] font-semibold uppercase tracking-[0.06em] text-on-surface-variant">
                    Footfall
                  </span>
                  <span className="font-label-numeric text-[13px] font-semibold text-on-surface mt-0.5">
                    {selectedAsset.footfallFormatted}
                  </span>
                  <span className="text-[10px] text-[#248a3d] font-medium mt-0.5">
                    {selectedAsset.footfallDelta}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="text-[11px] leading-[14px] font-semibold uppercase tracking-[0.06em] text-on-surface-variant">
                    Cooling Rate
                  </span>
                  <span className="font-label-numeric text-[13px] font-semibold text-on-surface mt-0.5">
                    {selectedAsset.coolingRate}
                  </span>
                  <span className="text-[10px] text-primary font-medium mt-0.5">
                    {selectedAsset.coolingSub}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col">
                  <span className="text-[11px] leading-[14px] font-semibold uppercase tracking-[0.06em] text-on-surface-variant">
                    Elevators
                  </span>
                  <span className="font-label-numeric text-[13px] font-semibold text-on-surface mt-0.5">
                    {selectedAsset.elevatorsStatus}
                  </span>
                  <span
                    className={`text-[10px] font-medium mt-0.5 ${
                      selectedAsset.elevatorsSubTone === 'amber'
                        ? 'text-[#c97700]'
                        : 'text-[#248a3d]'
                    }`}
                  >
                    {selectedAsset.elevatorsSub}
                  </span>
                </div>
              </div>

              {/* Interactive Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => onOpenCameraModal(selectedAsset)}
                  className="h-9 px-3 rounded-lg bg-surface-container-high hover:bg-surface-variant transition-colors flex items-center justify-center gap-1.5 text-on-surface text-[13px] font-medium shadow-sm cursor-pointer active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    videocam
                  </span>
                  <span className="whitespace-nowrap">View Live Cam</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenBmsModal(selectedAsset)}
                  className="h-9 px-3 rounded-lg bg-primary hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 text-on-primary text-[13px] font-medium shadow-sm cursor-pointer active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">speed</span>
                  <span className="whitespace-nowrap">BMS Telemetry</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Urgent & Highlighted Alerts Section */}
        <div className="xl:col-span-5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] leading-[22px] text-on-surface font-semibold tracking-[-0.012em]">
                Active Dispatches &amp; Events
              </span>
              <span className="w-5 h-5 rounded-full bg-error-container text-error flex items-center justify-center font-label-numeric text-[11px] font-bold">
                {sathornAcknowledged ? 1 : 2}
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenLogHistory}
              className="text-primary text-[12px] font-medium hover:underline cursor-pointer min-h-[32px]"
            >
              Log History
            </button>
          </div>

          {/* Alert List Stack */}
          <div className="flex flex-col gap-2.5">
            {/* Item 1: Sathorn Square Maintenance */}
            {(segment === 'all' || segment === 'critical') && (
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-sm flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-tertiary-fixed/70 flex-shrink-0 flex items-center justify-center text-tertiary mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">build</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onSelectAsset('sathorn-square')}
                          className="text-[15px] leading-[22px] font-semibold text-on-surface hover:text-primary cursor-pointer text-left"
                        >
                          Sathorn Square
                        </button>
                        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-semibold tracking-[0.04em]">
                          CAUTION
                        </span>
                      </div>
                      <p className="text-[13px] leading-[18px] text-on-surface-variant mt-0.5">
                        Lift Car #4 (High-Rise Zone) undergoing scheduled recalibration. 31/32
                        lifts active. Estimated duration: 25 mins.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-numeric text-[11px] text-on-surface-variant flex-shrink-0">
                    14:28
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant text-[12px]">
                    <span className="material-symbols-outlined text-[15px] text-[#248a3d]">
                      engineering
                    </span>
                    <span>OTIS Crew #2 On-Site</span>
                  </div>
                  <button
                    type="button"
                    disabled={sathornAcknowledged}
                    onClick={onAcknowledgeSathorn}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold shadow-sm transition-all whitespace-nowrap ${
                      sathornAcknowledged
                        ? 'bg-[#34c759]/20 text-[#248a3d] cursor-default'
                        : 'bg-surface-container-high hover:bg-surface-variant text-on-surface active:scale-95 cursor-pointer'
                    }`}
                  >
                    {sathornAcknowledged ? 'Acknowledged ✓' : 'Acknowledge'}
                  </button>
                </div>
              </div>
            )}

            {/* Item 2: QSNCC ASEAN Tech Summit (Major Event) */}
            {(segment === 'all' || segment === 'events') && (
              <div className="p-3.5 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-sm flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed/70 flex-shrink-0 flex items-center justify-center text-secondary mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">event</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onSelectAsset('qsncc')}
                          className="text-[15px] leading-[22px] font-semibold text-on-surface hover:text-primary cursor-pointer text-left"
                        >
                          QSNCC • ASEAN Tech Summit
                        </button>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-semibold tracking-[0.04em]">
                          PEAK LOAD
                        </span>
                      </div>
                      <p className="text-[13px] leading-[18px] text-on-surface-variant mt-0.5">
                        Plenary Hall 1-4 at 88% capacity (~38,000 pax today). MRT Benjakitti
                        pedestrian link operational with additional crowd marshals.
                      </p>
                    </div>
                  </div>
                  <span className="font-label-numeric text-[11px] text-on-surface-variant flex-shrink-0">
                    TODAY
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant text-[12px]">
                    <span className="material-symbols-outlined text-[15px] text-primary">
                      traffic
                    </span>
                    <span>Ratchada Gate Flow: Steady</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateTab(TabId.Events)}
                    className="px-3.5 py-1.5 rounded-lg bg-secondary-container hover:bg-secondary text-on-secondary-container text-[12px] font-semibold shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Event Deck
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

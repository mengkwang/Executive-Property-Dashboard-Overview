import React, { useState } from 'react';
import { SATHORN_ELEVATOR_CAM_URL } from '../data/portfolioData';
import {
  NotificationItem,
  PropertyAsset,
  ScheduledEventItem,
  TabId,
} from '../types/portfolio';

export type ActiveModal =
  | { type: 'camera'; asset: PropertyAsset }
  | { type: 'bms'; asset: PropertyAsset }
  | { type: 'broadcast' }
  | { type: 'commander' }
  | { type: 'log-history' }
  | { type: 'event-detail'; event: ScheduledEventItem }
  | { type: 'notifications' }
  | { type: 'profile' }
  | null;

interface CommandModalsProps {
  modal: ActiveModal;
  onClose: () => void;
  assets: PropertyAsset[];
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onSendBroadcast: (target: string, level: string, message: string) => void;
  broadcastLogs: { time: string; target: string; message: string; level: string }[];
  onTriggerToast: (title: string, subtitle: string, badge?: string) => void;
  onNavigateTab: (tab: TabId) => void;
}

export const CommandModals: React.FC<CommandModalsProps> = ({
  modal,
  onClose,
  assets,
  notifications,
  onMarkAllRead,
  onSelectNotification,
  onSendBroadcast,
  broadcastLogs,
  onTriggerToast,
}) => {
  const [targetAsset, setTargetAsset] = useState<string>('All 8 Prime Assets');
  const [directiveLevel, setDirectiveLevel] = useState<string>('Level-1 Priority');
  const [directiveText, setDirectiveText] = useState<string>(
    'Maintain elevated concourse marshal visibility during 17:30–19:30 ICT transit peak.'
  );
  const [chillerSetpoint, setChillerSetpoint] = useState<number>(23.5);
  const [imgFallback, setImgFallback] = useState<boolean>(false);

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/35 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl bg-surface-container-lowest/95 backdrop-blur-2xl shadow-2xl border border-white/60 overflow-hidden max-h-[88dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="w-10 h-1 bg-outline-variant/60 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* 1. LIVE CAMERA FEED MODAL */}
        {modal.type === 'camera' && (
          <div className="p-5 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34c759] animate-pulse" />
                  <span className="font-label-numeric text-[11px] font-semibold uppercase text-primary">
                    {modal.asset.cameraLabel}
                  </span>
                </div>
                <h3 className="text-[19px] font-semibold text-on-surface mt-0.5">
                  {modal.asset.name} · Live Optical Feed
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  {modal.asset.cameraZone}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-video bg-inverse-surface shadow-inner">
              {modal.asset.id === 'sathorn-square' && !imgFallback ? (
                <img
                  src={SATHORN_ELEVATOR_CAM_URL}
                  alt="Sathorn Square CAM 04 Elevator Optical Feed"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFallback(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1b2434] via-[#131a26] to-[#0d131d] p-4 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between text-[11px] font-label-numeric text-white/75">
                    <span>OPTICAL TELEMETRY STREAM · 60 FPS</span>
                    <span>14:42:18 ICT</span>
                  </div>
                  <div className="my-auto flex flex-col items-center justify-center py-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-2">
                      <span className="material-symbols-outlined text-[28px] text-[#abc7ff]">
                        videocam
                      </span>
                    </div>
                    <span className="text-[14px] font-semibold">
                      {modal.asset.name} — {modal.asset.cameraZone}
                    </span>
                    <span className="text-[12px] text-white/70 mt-0.5">
                      Encrypted Corridor CCTV Stream · Footfall {modal.asset.footfallFormatted} pax
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-label-numeric bg-black/35 rounded-lg p-2">
                    <div>FLOW: NOMINAL</div>
                    <div>THERMAL: 23.4°C</div>
                    <div>EGRESS: CLEAR</div>
                  </div>
                </div>
              )}

              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 text-white font-label-numeric text-[10px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                <span>LIVE REC · ENCRYPTED L4</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[10px] uppercase font-semibold text-outline block">
                  Footfall Count
                </span>
                <span className="font-label-numeric text-[13px] font-semibold text-on-surface">
                  {modal.asset.footfallFormatted}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[10px] uppercase font-semibold text-outline block">
                  Elevators
                </span>
                <span className="font-label-numeric text-[13px] font-semibold text-on-surface">
                  {modal.asset.elevatorsStatus}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container-low">
                <span className="text-[10px] uppercase font-semibold text-outline block">
                  Readiness
                </span>
                <span className="font-label-numeric text-[13px] font-semibold text-[#248a3d]">
                  {modal.asset.readinessPct}%
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onTriggerToast(
                    'Optical Frame Archived',
                    `${modal.asset.cameraLabel} saved to security dossier`,
                    'SAVED'
                  );
                  onClose();
                }}
                className="px-4 h-9 rounded-lg bg-primary text-on-primary text-[12px] font-semibold cursor-pointer"
              >
                Capture Diagnostic Snapshot
              </button>
            </div>
          </div>
        )}

        {/* 2. BMS TELEMETRY MODAL */}
        {modal.type === 'bms' && (
          <div className="p-5 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-label-numeric text-[11px] font-semibold uppercase text-primary">
                  BMS SUBSYSTEM TELEMETRY · SYNC 14ms
                </span>
                <h3 className="text-[19px] font-semibold text-on-surface mt-0.5">
                  {modal.asset.name}
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  {modal.asset.certification}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-surface-container-low">
                <span className="text-[10px] uppercase font-semibold text-outline block">
                  Cooling Plant Rate
                </span>
                <span className="font-label-numeric text-[18px] font-semibold text-on-surface">
                  {modal.asset.coolingRate}
                </span>
                <span className="text-[11px] text-primary block mt-0.5">
                  {modal.asset.coolingSub}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low">
                <span className="text-[10px] uppercase font-semibold text-outline block">
                  Active Power Load
                </span>
                <span className="font-label-numeric text-[18px] font-semibold text-on-surface">
                  {modal.asset.powerLoadMw}
                </span>
                <span className="text-[11px] text-[#248a3d] block mt-0.5">
                  Smart Grid Nominal
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-surface-container-low p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-on-surface">
                  District Chiller Supply Setpoint
                </span>
                <span className="font-label-numeric text-[13px] font-semibold text-primary">
                  {chillerSetpoint.toFixed(1)} °C
                </span>
              </div>
              <input
                type="range"
                min={21.5}
                max={25.5}
                step={0.5}
                value={chillerSetpoint}
                onChange={(e) => setChillerSetpoint(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-label-numeric text-outline">
                <span>21.5°C Pre-Cool</span>
                <span>23.5°C Optimal</span>
                <span>25.5°C Eco</span>
              </div>
            </div>

            <div className="space-y-2">
              {modal.asset.drawerRows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between py-1.5 border-b border-outline-variant/25 text-[12px]"
                >
                  <span className="text-on-surface-variant">{r.label}</span>
                  <span className="font-label-numeric font-semibold text-on-surface">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 h-9 rounded-lg bg-surface-container-high text-on-surface text-[12px] font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onTriggerToast(
                    'BMS Telemetry Setpoint Applied',
                    `${modal.asset.name} zone loop synced to ${chillerSetpoint.toFixed(
                      1
                    )}°C`,
                    'BMS SYNC'
                  );
                  onClose();
                }}
                className="px-4 h-9 rounded-lg bg-primary text-on-primary text-[12px] font-semibold cursor-pointer"
              >
                Apply Plant Calibration
              </button>
            </div>
          </div>
        )}

        {/* 3. BROADCAST SECURITY DIRECTIVE MODAL */}
        {modal.type === 'broadcast' && (
          <div className="p-5 flex flex-col gap-4 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-primary">
                  Executive Command Channel
                </span>
                <h3 className="text-[19px] font-semibold text-on-surface mt-0.5">
                  Broadcast Security Directive
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase text-outline block mb-1">
                  Target Complex / Corridor
                </label>
                <select
                  value={targetAsset}
                  onChange={(e) => setTargetAsset(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-[13px] text-on-surface"
                >
                  <option value="All 8 Prime Assets">All 8 Prime Assets (Unified Corridor)</option>
                  {assets.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name} — {a.subtitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-outline block mb-1">
                  Clearance &amp; Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Level-1 Priority', 'Marshal Advisory', 'BMS Protocol'].map(
                    (lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setDirectiveLevel(lvl)}
                        className={`h-9 rounded-lg text-[12px] font-medium cursor-pointer transition-colors ${
                          directiveLevel === lvl
                            ? 'bg-primary text-on-primary font-semibold'
                            : 'bg-surface-container-low text-on-surface-variant'
                        }`}
                      >
                        {lvl}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase text-outline block mb-1">
                  Directive Instructions
                </label>
                <textarea
                  rows={3}
                  value={directiveText}
                  onChange={(e) => setDirectiveText(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface-container-low border border-outline-variant/40 text-[13px] text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!directiveText.trim()) return;
                onSendBroadcast(targetAsset, directiveLevel, directiveText.trim());
                onClose();
              }}
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[13px] font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <span>Transmit Encrypted Directive</span>
            </button>
          </div>
        )}

        {/* 4. CONTACT DUTY COMMANDER MODAL */}
        {modal.type === 'commander' && (
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-secondary">
                  Duty Level 1 · Direct Comms
                </span>
                <h3 className="text-[19px] font-semibold text-on-surface mt-0.5">
                  Central Operations Commander
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-semibold">
                  NK
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-on-surface">
                    Khun Narongrit K.
                  </p>
                  <p className="text-[12px] text-on-surface-variant">
                    Bangkok Prime Corridor · Shift Lead (L4)
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#34c759]/15 text-[#248a3d] font-label-numeric text-[11px] font-semibold">
                ONLINE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onTriggerToast(
                    'Encrypted VoIP Bridge Active',
                    'Connected to Duty Commander Desk (Ch. 01)',
                    'VOICE L4'
                  );
                  onClose();
                }}
                className="h-10 rounded-xl bg-primary text-on-primary text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Initiate Secure Call</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onTriggerToast(
                    'Status Ping Acknowledged',
                    'Duty Commander confirmed all 8 nodes nominal',
                    'ACK 14ms'
                  );
                  onClose();
                }}
                className="h-10 rounded-xl bg-surface-container-high text-on-surface text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  verified_user
                </span>
                <span>Request SitRep</span>
              </button>
            </div>
          </div>
        )}

        {/* 5. DISPATCH LOG HISTORY MODAL */}
        {modal.type === 'log-history' && (
          <div className="p-5 flex flex-col gap-3.5 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-outline">
                  Audit Trail · ICT Timezone
                </span>
                <h3 className="text-[19px] font-semibold text-on-surface mt-0.5">
                  Corridor Dispatch &amp; Broadcast Log
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {broadcastLogs.map((log, i) => (
                <div
                  key={`${log.time}-${i}`}
                  className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-primary">
                      {log.target} · {log.level}
                    </span>
                    <span className="font-label-numeric text-[11px] text-outline">
                      {log.time}
                    </span>
                  </div>
                  <p className="text-[12px] text-on-surface">{log.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. EVENT PROTOCOL DETAIL MODAL */}
        {modal.type === 'event-detail' && (
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-primary">
                  {modal.event.venueHeader} · {modal.event.zoneLabel}
                </span>
                <h3 className="text-[18px] font-semibold text-on-surface mt-0.5">
                  {modal.event.title}
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  {modal.event.locationSub} ({modal.event.timeRange})
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-on-surface-variant">Anticipated Attendance</span>
                <span className="font-label-numeric font-semibold text-on-surface">
                  {modal.event.paxLabel}
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-on-surface-variant">Facility Load</span>
                <span className="font-label-numeric font-semibold text-primary">
                  {modal.event.loadStatusLabel}
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-on-surface-variant">Active Directive</span>
                <span className="font-medium text-on-surface text-right">
                  {modal.event.protocolText}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onTriggerToast(
                  'Venue Protocol Confirmed',
                  `${modal.event.venueHeader} marshals & HVAC synced`,
                  'ACTIVE'
                );
                onClose();
              }}
              className="w-full h-10 rounded-xl bg-primary text-on-primary text-[13px] font-semibold cursor-pointer"
            >
              Confirm Venue Readiness Protocol
            </button>
          </div>
        )}

        {/* 7. NOTIFICATIONS MODAL */}
        {modal.type === 'notifications' && (
          <div className="p-5 flex flex-col gap-3.5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-semibold text-on-surface">
                  Command Alerts
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  Real-time BMS, lift, and transit portal telemetry
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="text-[12px] font-semibold text-primary hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => onSelectNotification(n)}
                  className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                    n.unread
                      ? 'bg-primary-fixed/35 hover:bg-primary-fixed/50'
                      : 'bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                      <span className="text-[13px] font-semibold text-on-surface">
                        {n.title}
                      </span>
                    </div>
                    <p className="text-[12px] text-on-surface-variant mt-0.5">
                      {n.body}
                    </p>
                  </div>
                  <span className="font-label-numeric text-[11px] text-outline shrink-0">
                    {n.time}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 8. EXECUTIVE PROFILE MODAL */}
        {modal.type === 'profile' && (
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    person
                  </span>
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-on-surface">
                    Executive Portfolio Desk
                  </h3>
                  <p className="text-[12px] text-on-surface-variant">
                    Clearance Level L4 · Bangkok Prime Command
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="rounded-xl bg-surface-container-low p-3.5 space-y-2 text-[12px]">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Active District</span>
                <span className="font-semibold text-on-surface">
                  Rama IV · Sathorn · Wireless · Ratchada
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Connected BMS Nodes</span>
                <span className="font-label-numeric font-semibold text-[#248a3d]">
                  8 / 8 Online (100%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Telemetry Encryption</span>
                <span className="font-label-numeric font-semibold text-primary">
                  TLS 1.3 · Clearance L4
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  DayHorizonItem,
  ScheduledEventItem,
} from '../types/portfolio';

interface EventsScreenProps {
  horizonDays: DayHorizonItem[];
  events: ScheduledEventItem[];
  onInspectEvent: (event: ScheduledEventItem) => void;
  onTriggerToast: (title: string, subtitle: string, badge?: string) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  horizonDays,
  events,
  onInspectEvent,
  onTriggerToast,
}) => {
  const [selectedDayCode, setSelectedDayCode] = useState<string>('today');

  const activeDay =
    horizonDays.find((d) => d.code === selectedDayCode) || horizonDays[0];

  const dayEvents = events.filter((e) => e.dayCodes.includes(selectedDayCode));

  const getDotClass = (
    dotColor: DayHorizonItem['dotColor'],
    isSelected: boolean
  ) => {
    if (dotColor === 'error') return 'bg-error';
    if (dotColor === 'secondary')
      return isSelected ? 'bg-secondary-fixed' : 'bg-secondary';
    if (dotColor === 'tertiary')
      return isSelected ? 'bg-tertiary-fixed-dim' : 'bg-tertiary';
    return isSelected ? 'bg-white/70' : 'bg-outline-variant';
  };

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 pb-8 max-w-[1440px] mx-auto">
      {/* Executive Telemetry Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 mb-3.5">
        {/* Today's Anticipated Footfall Card */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
              {selectedDayCode === 'today'
                ? 'Today Footfall'
                : `${activeDay.dayLabel} ${activeDay.dateNum} Footfall`}
            </span>
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] leading-[32px] font-semibold text-on-surface tracking-[-0.02em] tabular-nums">
              {activeDay.footfallTotal}
            </span>
            <span className="font-label-numeric text-[12px] text-primary font-medium">
              Pax
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-tertiary">
              trending_up
            </span>
            <span className="text-[12px] leading-[16px] text-on-surface-variant">
              {activeDay.footfallDelta}
            </span>
          </div>
        </div>

        {/* 7-Day Peak Projection Card */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
              7-Day Peak
            </span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">
              electric_bolt
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] leading-[32px] font-semibold text-on-surface tracking-[-0.02em] tabular-nums">
              75.0k
            </span>
            <span className="font-label-numeric text-[12px] text-on-surface-variant font-medium">
              Est
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[11px] leading-[14px] text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full font-semibold">
              Thu 31 Oct
            </span>
          </div>
        </div>

        {/* Desktop Extra Summary Metrics */}
        <div className="hidden lg:flex flex-col justify-between relative overflow-hidden rounded-xl bg-surface-container-lowest p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
              Transit Portal Flow
            </span>
            <span className="material-symbols-outlined text-[16px] text-primary">
              subway
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] leading-[32px] font-semibold text-on-surface tracking-[-0.02em] tabular-nums">
              98.8%
            </span>
            <span className="font-label-numeric text-[12px] text-[#248a3d] font-medium">
              Clear
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[12px] text-on-surface-variant">
            <span>MRT &amp; BTS Skybridges Synced</span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-between relative overflow-hidden rounded-xl bg-surface-container-lowest p-3.5 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
              VIP &amp; Marshal Units
            </span>
            <span className="material-symbols-outlined text-[16px] text-secondary">
              verified_user
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[26px] leading-[32px] font-semibold text-on-surface tracking-[-0.02em] tabular-nums">
              42
            </span>
            <span className="font-label-numeric text-[12px] text-on-surface-variant font-medium">
              Active
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[12px] text-on-surface-variant">
            <span>Level-1 Diplomatic Protocol</span>
          </div>
        </div>
      </div>

      {/* Segmented Horizon Date Picker Strip */}
      <div className="w-full mb-5">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-[11px] leading-[14px] uppercase text-on-surface-variant tracking-[0.06em] font-semibold">
            October Directive Horizon
          </span>
          <button
            type="button"
            onClick={() => {
              setSelectedDayCode('today');
              onTriggerToast(
                'Real-Time Sensor Feed Synced',
                'Optical footfall counters calibrated across 8 assets',
                'LIVE'
              );
            }}
            className="text-[12px] leading-[16px] text-primary font-medium flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>Real-Time Feed</span>
            <span className="material-symbols-outlined text-[14px]">sensors</span>
          </button>
        </div>

        {/* Horizontal Scroll Calendar Picker */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 no-scrollbar scroll-smooth">
          {horizonDays.map((day) => {
            const isSelected = day.code === selectedDayCode;
            return (
              <button
                key={day.code}
                type="button"
                onClick={() => setSelectedDayCode(day.code)}
                className={`flex-shrink-0 flex flex-col items-center justify-between w-[48px] lg:w-[68px] h-[72px] py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low'
                }`}
              >
                <span
                  className={`text-[11px] leading-[14px] font-medium tracking-[0.04em] ${
                    isSelected ? 'opacity-90 text-on-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {day.dayLabel}
                </span>
                <span
                  className={`text-[17px] leading-[22px] tabular-nums ${
                    isSelected ? 'font-bold text-on-primary' : 'font-semibold text-on-surface'
                  }`}
                >
                  {day.dateNum}
                </span>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${getDotClass(
                    day.dotColor,
                    isSelected
                  )}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-Time Crowd Advisory Banner */}
      <div className="w-full bg-surface-container-low rounded-xl p-3.5 mb-5 flex items-start gap-2.5 shadow-sm">
        <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary text-[20px]">
            train
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[13px] leading-[18px] font-semibold text-on-surface">
              {activeDay.advisoryTitle}
            </span>
            <span className="font-label-numeric text-[12px] text-primary font-semibold shrink-0">
              {activeDay.advisoryTime}
            </span>
          </div>
          <p className="text-[12px] leading-[18px] text-on-surface-variant">
            {activeDay.advisoryBody}
          </p>
        </div>
      </div>

      {/* Day Event Directive Stream Header */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] leading-[14px] uppercase text-on-surface-variant tracking-[0.06em] font-semibold">
            Scheduled Venues
          </span>
          <span className="text-[11px] leading-[14px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">
            {dayEvents.length} ASSETS
          </span>
        </div>
        <span className="font-label-numeric text-[12px] text-on-surface-variant">
          Live Ops: Active
        </span>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {dayEvents.map((evt) => {
          const isHigh = evt.impactLevel === 'high';
          const isMod = evt.impactLevel === 'moderate';

          const impactPillClass = isHigh
            ? 'bg-error-container text-on-error-container'
            : isMod
            ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
            : 'bg-surface-container-high text-on-surface-variant';

          const impactDotClass = isHigh
            ? 'bg-error animate-pulse'
            : isMod
            ? 'bg-tertiary'
            : 'bg-outline';

          const loadTextClass = isHigh
            ? 'text-error'
            : isMod
            ? 'text-tertiary'
            : 'text-on-surface-variant';

          const barFillClass = isHigh
            ? 'bg-error'
            : isMod
            ? 'bg-tertiary'
            : 'bg-primary';

          const protocolIconColor = isHigh
            ? 'text-error'
            : isMod
            ? 'text-tertiary'
            : 'text-primary';

          return (
            <div
              key={evt.id}
              className="w-full bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col justify-between gap-2.5 relative overflow-hidden"
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="text-[11px] leading-[14px] uppercase tracking-[0.06em] font-semibold text-primary">
                        {evt.venueHeader}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                      <span className="text-[12px] leading-[16px] text-on-surface-variant">
                        {evt.zoneLabel}
                      </span>
                    </div>
                    <h2 className="text-[17px] leading-[22px] text-on-surface font-bold tracking-[-0.012em]">
                      {evt.title}
                    </h2>
                    <p className="text-[12px] leading-[16px] text-on-surface-variant mt-0.5">
                      {evt.locationSub}
                    </p>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] leading-[14px] uppercase tracking-[0.05em] font-semibold flex items-center gap-1 whitespace-nowrap ${impactPillClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${impactDotClass}`} />
                      {evt.impactLabel}
                    </span>
                    <span className="font-label-numeric text-[12px] text-on-surface font-bold mt-1.5">
                      {evt.paxLabel}
                    </span>
                  </div>
                </div>

                {/* Venue Capacity & Crowd Heatmap Bar */}
                <div className="mt-1">
                  <div className="flex items-center justify-between text-[12px] mb-1.5">
                    <span className="text-on-surface-variant">
                      Facility Load Capacity
                    </span>
                    <span
                      className={`font-label-numeric text-[12px] font-semibold ${loadTextClass}`}
                    >
                      {evt.loadStatusLabel}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                    <div
                      className={`h-full ${barFillClass} rounded-full transition-all duration-500`}
                      style={{ width: `${evt.loadPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 mt-1">
                {/* Operational Directives & Protocols */}
                <div className="rounded-lg bg-surface-container-low p-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`material-symbols-outlined text-[18px] ${protocolIconColor} flex-shrink-0`}
                    >
                      {evt.protocolIcon}
                    </span>
                    <span className="text-[12px] leading-[16px] text-on-surface font-medium truncate">
                      {evt.protocolText}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onInspectEvent(evt)}
                    className="flex-shrink-0 px-2.5 py-1 rounded-md bg-surface-container hover:bg-surface-container-high text-primary text-[11px] font-semibold tracking-[0.04em] cursor-pointer active:scale-95 transition-transform"
                  >
                    {evt.actionButtonLabel}
                  </button>
                </div>

                {/* Real-Time Contextual Footer */}
                <div className="flex items-center justify-between pt-0.5 text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
                      {evt.footerIcon}
                    </span>
                    <span className="text-[12px] leading-[16px]">
                      {evt.footerText}
                    </span>
                  </div>
                  <span className="font-label-numeric text-[12px] text-on-surface-variant">
                    {evt.timeRange}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Operational Export & C-Suite Dossier Dispatch Action */}
      <div className="mt-7 flex flex-col gap-2 max-w-xl">
        <button
          type="button"
          onClick={() =>
            onTriggerToast(
              'Directive Dossier Generated',
              'Sent to Central Portfolio Ops',
              'PDF • 4.8MB'
            )
          }
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[15px] font-medium shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">ios_share</span>
          <span>Export Executive Crowd Dossier</span>
        </button>
        <div className="flex items-center justify-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span className="text-[11px] leading-[14px] font-semibold tracking-[0.06em] uppercase">
            Encrypted Bangkok Command Network • Clearance L4
          </span>
        </div>
      </div>
    </div>
  );
};

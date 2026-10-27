import React, { useEffect, useState } from 'react';
import { AssetCategory, PropertyAsset } from '../types/portfolio';

interface ReadinessScreenProps {
  assets: PropertyAsset[];
  onOpenBmsModal: (asset: PropertyAsset) => void;
  onTriggerToast: (title: string, subtitle: string, badge?: string) => void;
}

type ReadinessFilter = 'all' | AssetCategory;

export const ReadinessScreen: React.FC<ReadinessScreenProps> = ({
  assets,
  onOpenBmsModal,
  onTriggerToast,
}) => {
  const [filter, setFilter] = useState<ReadinessFilter>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [latencyMs, setLatencyMs] = useState<number>(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs((prev) => (prev === 14 ? 13 : prev === 13 ? 15 : 14));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAssets =
    filter === 'all' ? assets : assets.filter((a) => a.category === filter);

  const getVitalColorClass = (tone?: 'default' | 'green' | 'blue' | 'amber') => {
    if (tone === 'green') return 'text-[#248a3d]';
    if (tone === 'blue') return 'text-[#0071e3]';
    if (tone === 'amber') return 'text-[#c97700]';
    return 'text-on-surface';
  };

  return (
    <div className="flex flex-col w-full pb-8 max-w-[1440px] mx-auto">
      {/* Top Ambient Telemetry Ticker */}
      <div className="px-4 lg:px-8 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] animate-pulse" />
          <span className="font-label-numeric text-[12px] text-on-surface-variant uppercase tracking-wider">
            Live BMS Telemetry Sync
          </span>
        </div>
        <span className="font-label-numeric text-[12px] text-outline">
          Latency: {latencyMs}ms
        </span>
      </div>

      {/* Portfolio Executive Summary Canvas Card */}
      <div className="px-4 lg:px-8 mb-4">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-4 lg:p-5 shadow-sm">
          <div className="absolute -right-6 -bottom-8 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[11px] leading-[14px] font-semibold uppercase text-outline tracking-[0.06em]">
                Bangkok Core Portfolio
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-[26px] leading-[32px] lg:text-[32px] lg:leading-[38px] text-on-surface tracking-[-0.02em] font-semibold tabular-nums">
                  97.4%
                </span>
                <span className="font-label-numeric text-[12px] text-[#248a3d] font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  +0.6%
                </span>
              </div>
              <p className="text-[12px] leading-[16px] text-on-surface-variant mt-0.5">
                Portfolio Readiness Index
              </p>
            </div>

            {/* Inline SVG Ring Metric */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                <circle
                  className="stroke-surface-container-high"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  strokeWidth="3.5"
                />
                <circle
                  className="stroke-primary"
                  cx="24"
                  cy="24"
                  fill="none"
                  r="20"
                  strokeDasharray="125.6"
                  strokeDashoffset="3.26"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <span className="absolute font-label-numeric text-[11px] font-semibold text-primary">
                8/8
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 mt-3 bg-surface-container-low/60 rounded-lg p-2.5">
            <div>
              <span className="text-[11px] leading-[14px] font-semibold text-outline block">
                Active Nodes
              </span>
              <span className="font-label-numeric text-[12px] text-on-surface font-medium">
                8 Complexes
              </span>
            </div>
            <div>
              <span className="text-[11px] leading-[14px] font-semibold text-outline block">
                Footfall Total
              </span>
              <span className="font-label-numeric text-[12px] text-on-surface font-medium">
                132.8k / day
              </span>
            </div>
            <div>
              <span className="text-[11px] leading-[14px] font-semibold text-outline block">
                HVAC Optimal
              </span>
              <span className="font-label-numeric text-[12px] text-[#248a3d] font-medium">
                100% Target
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Segmented Control */}
      <div className="px-4 lg:px-8 mb-4">
        <div className="h-9 p-0.5 bg-surface-container-high rounded-xl flex items-center shadow-inner max-w-xl">
          {(
            [
              { key: 'all', label: 'All (8)' },
              { key: 'mixed', label: 'Mixed-Use' },
              { key: 'office', label: 'Office' },
              { key: 'convention', label: 'Convention' },
            ] as const
          ).map((item) => {
            const active = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                className={`flex-1 h-8 px-2 rounded-lg text-[12px] leading-[16px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
                    : 'text-on-surface-variant font-medium hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Readiness Cards Stack (1-col mobile, 2-col desktop) */}
      <div className="px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {filteredAssets.map((asset) => {
          const isExpanded = Boolean(expandedIds[asset.id]);
          const isCaution = asset.statusTone === 'caution';
          const isPeak = asset.statusTone === 'peak';

          const badgeClasses = isCaution
            ? 'bg-[#ff9500]/15 text-[#c97700]'
            : isPeak
            ? 'bg-[#0071e3]/15 text-[#0071e3]'
            : 'bg-[#34c759]/15 text-[#248a3d]';

          const barColor = isCaution
            ? 'bg-[#ff9500]'
            : isPeak
            ? 'bg-[#0071e3]'
            : 'bg-[#34c759]';

          const dotColor = isCaution
            ? 'bg-[#ff9500] animate-pulse'
            : isPeak
            ? 'bg-[#0071e3]'
            : 'bg-[#34c759]';

          return (
            <div
              key={asset.id}
              className="rounded-xl bg-surface-container-lowest p-3.5 shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <button
                  type="button"
                  onClick={() => toggleExpand(asset.id)}
                  className="w-full flex items-start justify-between cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                      <span
                        className={`material-symbols-outlined text-[20px] ${
                          isCaution ? 'text-[#c97700]' : 'text-primary'
                        }`}
                      >
                        {asset.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-[17px] leading-[22px] tracking-[-0.012em] text-on-surface font-semibold">
                          {asset.name}
                        </h2>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-label-numeric font-semibold ${badgeClasses}`}
                        >
                          {asset.readinessPct === 100
                            ? '100%'
                            : `${asset.readinessPct.toFixed(1)}%`}
                        </span>
                      </div>
                      <p className="text-[12px] leading-[16px] text-on-surface-variant">
                        {asset.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span
                      className={`material-symbols-outlined text-[18px] text-outline transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Health Mini Bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] leading-[14px] font-semibold text-outline">
                      Subsystem Integrity
                    </span>
                    <span
                      className={`font-label-numeric text-[11px] font-medium ${
                        isCaution ? 'text-[#c97700]' : 'text-on-surface'
                      }`}
                    >
                      {asset.subsystemLabel}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${asset.readinessPct}%` }}
                    />
                  </div>
                </div>

                {/* Core Vitals Grid */}
                <div className="grid grid-cols-4 gap-1.5 mt-3 pt-1">
                  {asset.vitals.map((vital) => (
                    <div
                      key={vital.label}
                      className="p-1.5 rounded bg-surface-container-low/70 text-center"
                    >
                      <span className="text-[10px] leading-[13px] font-medium text-outline block">
                        {vital.label}
                      </span>
                      <span
                        className={`font-label-numeric text-[11px] font-semibold ${getVitalColorClass(
                          vital.tone
                        )}`}
                      >
                        {vital.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Telemetry Drawer */}
              {isExpanded && (
                <div className="mt-3 bg-surface-container-low/50 rounded-lg p-2.5 space-y-1.5">
                  {asset.cautionBanner && (
                    <div className="flex items-center gap-2 mb-2 p-2 rounded bg-amber-500/10 text-on-surface">
                      <span className="material-symbols-outlined text-[16px] text-[#c97700]">
                        info
                      </span>
                      <span className="text-[12px] font-medium">
                        {asset.cautionBanner}
                      </span>
                    </div>
                  )}
                  {asset.drawerRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center text-[12px] text-on-surface-variant"
                    >
                      <span>{row.label}</span>
                      <span
                        className={`font-label-numeric text-[12px] font-semibold ${getVitalColorClass(
                          row.tone
                        )}`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div className="pt-1.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onOpenBmsModal(asset)}
                      className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Live BMS Console</span>
                      <span className="material-symbols-outlined text-[14px]">
                        open_in_new
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Executive Action Trigger */}
      <div className="px-4 lg:px-8 mt-5 mb-2 max-w-xl">
        <button
          type="button"
          onClick={() =>
            onTriggerToast(
              'Portfolio Readiness Brief Dispatched',
              '97.4% Core Readiness report transmitted to Executive Desk',
              'ENCRYPTED'
            )
          }
          className="w-full h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[13px] font-medium shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>Dispatch Portfolio Brief to Executive Desk</span>
        </button>
      </div>
    </div>
  );
};

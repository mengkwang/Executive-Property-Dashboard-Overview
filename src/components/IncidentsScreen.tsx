import React, { useEffect, useState } from 'react';
import {
  IncidentItem,
  IncidentStatus,
  PropertyAsset,
} from '../types/portfolio';

interface IncidentsScreenProps {
  incidents: IncidentItem[];
  assets: PropertyAsset[];
  sathornAcknowledged: boolean;
  onAcknowledgeSathorn: () => void;
  onDeployMarshal: () => void;
  silomMarshalsCount: number;
  onOpenCameraModal: (asset: PropertyAsset) => void;
  onOpenBroadcastModal: () => void;
  onOpenCommanderModal: () => void;
  onTriggerToast: (title: string, subtitle: string, badge?: string) => void;
}

type FilterOption = 'all' | IncidentStatus;

export const IncidentsScreen: React.FC<IncidentsScreenProps> = ({
  incidents,
  assets,
  sathornAcknowledged,
  onAcknowledgeSathorn,
  onDeployMarshal,
  silomMarshalsCount,
  onOpenCameraModal,
  onOpenBroadcastModal,
  onOpenCommanderModal,
  onTriggerToast,
}) => {
  const [pollCountdown, setPollCountdown] = useState<number>(12);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [dispatchState, setDispatchState] = useState<
    'idle' | 'connecting' | 'sent'
  >('idle');
  const [camImgError, setCamImgError] = useState<boolean>(false);
  const [showSilomMenu, setShowSilomMenu] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPollCountdown((prev) => (prev <= 1 ? 15 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmergencyDispatch = () => {
    if (dispatchState !== 'idle') return;
    setDispatchState('connecting');
    setTimeout(() => {
      setDispatchState('sent');
      onTriggerToast(
        'Emergency Protocol Signal Sent',
        'Central Portfolio Ops & Duty Commander alerted',
        'PRIORITY 1'
      );
      setTimeout(() => {
        setDispatchState('idle');
      }, 2500);
    }, 850);
  };

  const findAsset = (assetId: string) =>
    assets.find((a) => a.id === assetId) || assets[0];

  const visibleIncidents =
    filter === 'all'
      ? incidents
      : incidents.filter((inc) => inc.status === filter);

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 pb-6 space-y-3.5 max-w-[1440px] mx-auto pt-2">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        <div className="xl:col-span-8 flex flex-col space-y-3.5">
          {/* Operational Telemetry Bar */}
          <section className="bg-surface-container-lowest/85 backdrop-blur-xl rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2">
              <div className="flex items-center space-x-1.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[11px] leading-[14px] font-semibold uppercase tracking-[0.06em] text-on-surface-variant">
                  Telemetry Active
                </span>
              </div>
              <div className="flex items-center space-x-1 text-on-surface-variant">
                <span className="material-symbols-outlined text-[14px]">sync</span>
                <span className="font-label-numeric text-[12px]">
                  {pollCountdown}s
                </span>
              </div>
            </div>

            {/* Status Metric Group */}
            <div className="grid grid-cols-2 gap-2 mb-3.5">
              <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
                    Active Minor
                  </p>
                  <p className="text-[20px] leading-[26px] font-semibold tracking-[-0.015em] text-tertiary tabular-nums">
                    {sathornAcknowledged ? '0 Unack' : '1 Alert'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[18px]">
                    build_circle
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
                    Critical
                  </p>
                  <p className="text-[20px] leading-[26px] font-semibold tracking-[-0.015em] text-on-surface tabular-nums">
                    0 Threat
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">
                    verified_user
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Dispatch Trigger */}
            <button
              type="button"
              onClick={handleEmergencyDispatch}
              className="w-full h-10 rounded-lg bg-error-container hover:bg-error-container/80 text-on-error-container text-[13px] font-semibold flex items-center justify-center space-x-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              {dispatchState === 'connecting' ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    refresh
                  </span>
                  <span>Connecting Command Network...</span>
                </>
              ) : dispatchState === 'sent' ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    done_all
                  </span>
                  <span>Signal Dispatched to Central Ops</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px] text-error">
                    e911_emergency
                  </span>
                  <span>Emergency Dispatch Protocol</span>
                </>
              )}
            </button>
          </section>

          {/* Filter Pills */}
          <section className="overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex space-x-2 min-w-max py-0.5">
              {(
                [
                  { id: 'all', label: 'All Incidents' },
                  { id: 'active', label: 'Active (1)' },
                  { id: 'monitoring', label: 'Monitoring (1)' },
                  { id: 'cleared', label: 'Cleared (2)' },
                ] as const
              ).map((pill) => {
                const isActive = filter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setFilter(pill.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[12px] leading-[16px] transition-all active:scale-95 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Incidents Stack */}
          <section className="flex flex-col space-y-3.5">
            {visibleIncidents.map((inc) => {
              if (inc.id === 'inc-sathorn') {
                const asset = findAsset('sathorn-square');
                return (
                  <article
                    key={inc.id}
                    className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-xl p-3.5 shadow-sm relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <span className="material-symbols-outlined text-primary text-[16px]">
                            {inc.icon}
                          </span>
                          <span className="text-[17px] leading-[22px] font-semibold text-on-surface tracking-[-0.012em]">
                            {inc.assetName}
                          </span>
                        </div>
                        <p className="text-[12px] leading-[16px] text-on-surface-variant">
                          {inc.subtitle}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-label-numeric font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary mr-1.5 animate-pulse" />
                        {sathornAcknowledged ? 'Acknowledged' : inc.badgeLabel}
                      </span>
                    </div>

                    <p className="text-[13px] leading-[18px] text-on-surface mb-3.5">
                      {inc.description}
                    </p>

                    {/* Video Feed & Diagnostic Detail */}
                    <div className="grid grid-cols-5 gap-2.5 mb-3.5 bg-surface-container-low p-2 rounded-lg">
                      <button
                        type="button"
                        onClick={() => onOpenCameraModal(asset)}
                        className="col-span-2 relative rounded overflow-hidden aspect-video bg-surface-dim group cursor-pointer"
                      >
                        {!camImgError && inc.cameraUrl ? (
                          <img
                            src={inc.cameraUrl}
                            alt={inc.cameraAlt || 'Elevator optical camera feed'}
                            referrerPolicy="no-referrer"
                            onError={() => setCamImgError(true)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center text-white/80">
                            <span className="material-symbols-outlined text-[20px]">
                              videocam
                            </span>
                            <span className="text-[9px] font-label-numeric mt-0.5">
                              OPTICAL FEED
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-1 left-1 px-1 py-0.5 bg-inverse-surface/85 rounded text-[9px] font-label-numeric text-inverse-on-surface">
                          {inc.cameraBadge}
                        </div>
                      </button>

                      <div className="col-span-3 flex flex-col justify-center space-y-1">
                        <div className="flex items-center space-x-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[13px]">
                            timer
                          </span>
                          <span className="font-label-numeric text-[12px] text-on-surface">
                            {inc.etaText}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[13px]">
                            engineering
                          </span>
                          <span className="text-[12px] truncate">
                            {inc.crewText}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="flex items-center space-x-2 pt-0.5">
                      <button
                        type="button"
                        disabled={sathornAcknowledged}
                        onClick={onAcknowledgeSathorn}
                        className={`flex-1 h-9 rounded-lg text-[12px] font-semibold flex items-center justify-center space-x-1.5 shadow-sm transition-all ${
                          sathornAcknowledged
                            ? 'bg-[#34c759]/20 text-[#248a3d] cursor-default'
                            : 'bg-primary hover:bg-primary-container text-on-primary active:scale-95 cursor-pointer'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          check_circle
                        </span>
                        <span>
                          {sathornAcknowledged ? 'Acknowledged' : 'Acknowledge'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenCameraModal(asset)}
                        className="px-3 h-9 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface text-[12px] font-semibold flex items-center justify-center space-x-1 active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          videocam
                        </span>
                        <span>Feed</span>
                      </button>
                    </div>
                  </article>
                );
              }

              if (inc.id === 'inc-silom') {
                const asset = findAsset('silom-edge');
                return (
                  <article
                    key={inc.id}
                    className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-xl p-3.5 shadow-sm relative"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <span className="material-symbols-outlined text-primary text-[16px]">
                            {inc.icon}
                          </span>
                          <span className="text-[17px] leading-[22px] font-semibold text-on-surface tracking-[-0.012em]">
                            {inc.assetName}
                          </span>
                        </div>
                        <p className="text-[12px] leading-[16px] text-on-surface-variant">
                          {inc.subtitle}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-label-numeric font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5" />
                        {inc.badgeLabel}
                      </span>
                    </div>

                    <p className="text-[13px] leading-[18px] text-on-surface mb-2.5">
                      {inc.description}
                    </p>

                    <div className="bg-surface-container-low rounded-lg p-2.5 mb-3.5 space-y-1.5">
                      <div className="flex items-center justify-between font-label-numeric text-[12px]">
                        <span className="text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            shield_person
                          </span>
                          +{silomMarshalsCount} Marshals Deployed
                        </span>
                        <span className="text-primary font-semibold">
                          {inc.activeAgoText}
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-secondary-container h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(
                              52,
                              (inc.occupancyBarPct || 78) -
                                (silomMarshalsCount - 2) * 8
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 relative">
                      <button
                        type="button"
                        onClick={() => onOpenCameraModal(asset)}
                        className="flex-1 h-9 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface text-[12px] font-semibold flex items-center justify-center space-x-1.5 active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          linked_services
                        </span>
                        <span>View Live Cam</span>
                      </button>
                      <button
                        type="button"
                        aria-label="More incident actions"
                        onClick={() => setShowSilomMenu((v) => !v)}
                        className="h-9 w-9 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          more_horiz
                        </span>
                      </button>

                      {showSilomMenu && (
                        <div className="absolute right-0 bottom-11 z-30 w-48 rounded-xl bg-surface-container-lowest shadow-lg border border-outline-variant/40 p-1.5 flex flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() => {
                              onDeployMarshal();
                              setShowSilomMenu(false);
                            }}
                            className="w-full px-2.5 py-2 text-left text-[12px] font-medium text-on-surface hover:bg-surface-container-low rounded-lg flex items-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px] text-primary">
                              person_add
                            </span>
                            <span>Deploy +1 Marshal</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowSilomMenu(false);
                              onTriggerToast(
                                'Skywalk Telemetry Logged',
                                'BTS Sala Daeng portal flow snapshot saved',
                                'SYNCED'
                              );
                            }}
                            className="w-full px-2.5 py-2 text-left text-[12px] font-medium text-on-surface hover:bg-surface-container-low rounded-lg flex items-center gap-2 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
                              analytics
                            </span>
                            <span>Snapshot Crowd Meter</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              }

              // Cleared / Secured Cards
              return (
                <article
                  key={inc.id}
                  className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-xl p-3.5 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span className="material-symbols-outlined text-outline text-[16px]">
                          {inc.icon}
                        </span>
                        <span className="text-[17px] leading-[22px] font-semibold text-on-surface tracking-[-0.012em]">
                          {inc.assetName}
                        </span>
                      </div>
                      <p className="text-[12px] leading-[16px] text-on-surface-variant">
                        {inc.subtitle}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-label-numeric font-medium">
                      {inc.badgeLabel}
                    </span>
                  </div>
                  <p className="text-[13px] leading-[18px] text-on-surface-variant mb-2">
                    {inc.description}
                  </p>
                  <div className="flex items-center justify-between text-on-surface-variant text-[11px] pt-1">
                    <span className="flex items-center gap-1">
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          inc.footerLeftIconColor || 'text-[#34c759]'
                        }`}
                      >
                        {inc.footerLeftIcon}
                      </span>
                      {inc.footerLeftText}
                    </span>
                    <span className="font-label-numeric text-[11px]">
                      {inc.footerRightText}
                    </span>
                  </div>
                </article>
              );
            })}
          </section>
        </div>

        {/* Executive Directives Sheet Drawer */}
        <div className="xl:col-span-4">
          <section className="bg-surface-container-low rounded-xl p-3.5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] leading-[14px] font-semibold text-on-surface-variant uppercase tracking-[0.06em]">
                Executive Directives
              </span>
              <span className="font-label-numeric text-[11px] text-primary font-medium">
                Duty Level 1
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={onOpenBroadcastModal}
                className="w-full h-11 px-3.5 bg-surface-container-lowest hover:bg-surface-container-lowest/80 text-on-surface rounded-lg flex items-center justify-between active:bg-surface-container-high transition-colors shadow-sm cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    campaign
                  </span>
                  <span className="text-[13px] font-medium">
                    Broadcast Security Directive
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenCommanderModal}
                className="w-full h-11 px-3.5 bg-surface-container-lowest hover:bg-surface-container-lowest/80 text-on-surface rounded-lg flex items-center justify-between active:bg-surface-container-high transition-colors shadow-sm cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    support_agent
                  </span>
                  <span className="text-[13px] font-medium">
                    Contact Duty Commander
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#34c759]" />
                  <span className="material-symbols-outlined text-outline text-[18px]">
                    call
                  </span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "./LeadProfilePage.scss";
import type { LeadType } from "../../../models/leads";
import { formatDateTime, leadAgeTone, timeAgo, toneFor, toneLabel, type StatusTone } from "../../../helpers/leadProfileHelpers";



type LeadProfilePageProps = {
lead: LeadType;
onEdit?: () => void;
onMessage?: () => void;
onArchive?: () => void;
};



const initials = (firstName: string, lastName: string) =>
`${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();


export const LeadProfilePage: React.FC<LeadProfilePageProps> = ({
lead,
onEdit,
onMessage,
onArchive,
}) => {
const fullName = `${lead.firstName} ${lead.lastName}`;
const receivedAtLabel = formatDateTime(lead.receivedAt);
const receivedAgo = timeAgo(lead.receivedAt);
const ageTone = leadAgeTone(lead.receivedAt);

const communicationScore =
    Number(lead.welcome_email_sent) + Number(lead.whatsappAnswer);

return (
    <div className="lead-page">
    <div className="lead-page__orb lead-page__orb--one" />
    <div className="lead-page__orb lead-page__orb--two" />
    <div className="lead-page__gridline" />

    <div className="lead-page__container">
        <header className="hero-card">
        <div className="hero-card__topbar">
            <div className="hero-card__breadcrumbs">
            <span>Leads</span>
            <span className="hero-card__sep">/</span>
            <span>Profile</span>
            </div>

            <div className="hero-card__actions">
            <button className="icon-button" type="button" onClick={onMessage}>
                Message
            </button>
            <button className="icon-button" type="button" onClick={onArchive}>
                Archive
            </button>
            <button className="primary-button" type="button" onClick={onEdit}>
                Edit lead
            </button>
            </div>
        </div>

        <div className="hero-card__content">
            <div className="avatar-badge" aria-hidden="true">
            {initials(lead.firstName, lead.lastName)}
            </div>

            <div className="hero-card__main">
            <div className="hero-card__kicker">
                <span className={`dot dot--${ageTone}`} />
                Lead profile
            </div>

            <h1 className="hero-card__name">{fullName}</h1>

            <p className="hero-card__subtitle">
                A premium snapshot of identity, source, engagement, and workflow status.
                Built for sales teams that need context fast.
            </p>

            <div className="hero-card__tags">
                <span className="tag tag--id">#{lead.id}</span>
                <span className="tag">{lead.source}</span>
                <span className="tag tag--accent">{lead.product_interest}</span>
                <span className="tag tag--ghost">{lead.utmCampaign || "No campaign"}</span>
            </div>
            </div>

            <div className="hero-card__stats">
            <MetricCard label="Received" value={receivedAgo} hint={receivedAtLabel} />
            <MetricCard
                label="Comms score"
                value={`${communicationScore}/2`}
                hint="Email + WhatsApp"
            />
            <MetricCard
                label="Response speed"
                value={lead.whatsappAnswer ? "Warm" : "Cold"}
                hint={lead.whatsappAnswer ? "Lead replied" : "No reply yet"}
            />
            </div>
        </div>
        </header>

        <main className="profilelayout">
        <section className="main-column">
            <div className="panel panel--glass">
            <div className="panel__header">
                <div>
                <h2>Overview</h2>
                <p>Structured contact and campaign data.</p>
                </div>
            </div>

            <div className="detail-grid">
                <DetailItem label="First name" value={lead.firstName} />
                <DetailItem label="Last name" value={lead.lastName} />
                <DetailItem label="Email" value={lead.email} copyable />
                <DetailItem label="Phone" value={lead.phone} copyable />
                <DetailItem label="Source" value={lead.source} />
                <DetailItem label="Product interest" value={lead.product_interest} />
                <DetailItem label="UTM campaign" value={lead.utmCampaign || "—"} />
                <DetailItem label="Received at" value={receivedAtLabel} />
            </div>
            </div>

            <div className="panel panel--glass">
            <div className="panel__header">
                <div>
                <h2>Engagement timeline</h2>
                <p>The most important actions at a glance.</p>
                </div>
            </div>

            <div className="timeline">
                <TimelineItem
                title="Lead received"
                time={receivedAtLabel}
                tone="neutral"
                description={`Captured from ${lead.source}.`}
                />
                <TimelineItem
                title="Welcome email"
                time={lead.welcome_email_sent ? "Sent" : "Not sent"}
                tone={toneFor(lead.welcome_email_sent)}
                description={
                    lead.welcome_email_sent
                    ? "Automated welcome sequence completed."
                    : "The first email touchpoint is still pending."
                }
                />
                <TimelineItem
                title="WhatsApp response"
                time={lead.whatsappAnswer ? "Answered" : "Waiting"}
                tone={toneFor(lead.whatsappAnswer)}
                description={
                    lead.whatsappAnswer
                    ? "Lead replied on WhatsApp."
                    : "No answer received on WhatsApp yet."
                }
                />
            </div>
            </div>
        </section>

        <aside className="side-column">
            <section className="panel panel--compact panel--accent">
            <div className="panel__header">
                <div>
                <h2>Engagement state</h2>
                <p>Status summary for CRM actions.</p>
                </div>
            </div>

            <div className="status-stack">
                <StatusTile
                title="Welcome email"
                status={toneLabel(lead.welcome_email_sent)}
                tone={toneFor(lead.welcome_email_sent)}
                />
                <StatusTile
                title="WhatsApp"
                status={toneLabel(lead.whatsappAnswer)}
                tone={toneFor(lead.whatsappAnswer)}
                />
            </div>
            </section>

            <section className="panel panel--compact">
            <div className="panel__header">
                <div>
                <h2>Lead intelligence</h2>
                <p>Signals to guide the next move.</p>
                </div>
            </div>

            <div className="signal-ring">
                <div className="signal-ring__circle">
                <div className="signal-ring__value">{communicationScore}</div>
                <div className="signal-ring__label">signals</div>
                </div>
            </div>

            <div className="mini-grid">
                <MiniStat label="Source" value={lead.source} />
                <MiniStat label="Campaign" value={lead.utmCampaign || "—"} />
                <MiniStat label="Interest" value={lead.product_interest} />
                <MiniStat label="Freshness" value={receivedAgo} />
            </div>
            </section>

            <section className="panel panel--compact">
            <div className="panel__header">
                <div>
                <h2>Quick tags</h2>
                <p>Useful for filtering and routing.</p>
                </div>
            </div>

            <div className="chips">
                <Chip tone={toneFor(lead.welcome_email_sent)}>
                {lead.welcome_email_sent ? "Email sent" : "Email pending"}
                </Chip>
                <Chip tone={toneFor(lead.whatsappAnswer)}>
                {lead.whatsappAnswer ? "WhatsApp replied" : "WhatsApp waiting"}
                </Chip>
                <Chip tone="neutral">{lead.source}</Chip>
                <Chip tone="neutral">{lead.product_interest}</Chip>
            </div>
            </section>
        </aside>
        </main>
    </div>
    </div>
);
};

const MetricCard: React.FC<{ label: string; value: string; hint: string }> = ({
label,
value,
hint,
}) => (
<div className="metric-card">
    <span className="metric-card__label">{label}</span>
    <div className="metric-card__value">{value}</div>
    <span className="metric-card__hint">{hint}</span>
</div>
);

const DetailItem: React.FC<{
label: string;
value: string;
copyable?: boolean;
}> = ({ label, value, copyable }) => (
<div className="detail-item">
    <div className="detail-item__label">{label}</div>
    <div className="detail-item__value" title={value}>
    {value}
    {copyable ? <span className="detail-item__copy">copy</span> : null}
    </div>
</div>
);

const TimelineItem: React.FC<{
title: string;
time: string;
description: string;
tone: StatusTone;
}> = ({ title, time, description, tone }) => (
<div className="timeline-item">
    <div className="timeline-item__rail">
    <span className={`timeline-item__dot timeline-item__dot--${tone}`} />
    <span className="timeline-item__line" />
    </div>

    <div className="timeline-item__body">
    <div className="timeline-item__head">
        <h3>{title}</h3>
        <span className={`badge badge--${tone}`}>{time}</span>
    </div>
    <p>{description}</p>
    </div>
</div>
);

const StatusTile: React.FC<{
title: string;
status: string;
tone: StatusTone;
}> = ({ title, status, tone }) => (
<div className="status-tile">
    <div className="status-tile__left">
    <div className={`status-tile__dot status-tile__dot--${tone}`} />
    <div>
        <div className="status-tile__title">{title}</div>
        <div className="status-tile__status">{status}</div>
    </div>
    </div>
</div>
);

const MiniStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
<div className="mini-stat">
    <span>{label}</span>
    <strong>{value}</strong>
</div>
);

const Chip: React.FC<{ tone: StatusTone; children: React.ReactNode }> = ({
tone,
children,
}) => <span className={`chip chip--${tone}`}>{children}</span>;
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../src/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcryptjs"));
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Seeding Zyra database…');
    const org = await prisma.organization.upsert({
        where: { id: 'org_acme' },
        create: { id: 'org_acme', name: 'Acme Support' },
        update: { name: 'Acme Support' },
    });
    console.log(`  ✔ Organization: ${org.name}`);
    await prisma.channelConnection.upsert({
        where: { organizationId_channel: { organizationId: org.id, channel: 'EMAIL' } },
        create: {
            id: 'conn_email_acme',
            organizationId: org.id,
            channel: 'EMAIL',
            status: 'ACTIVE',
            verifiedAt: new Date(),
            config: {
                domain: 'acme-support.dev',
                fromAddress: 'support@acme-support.dev',
                fromName: 'Acme Support',
                providerDomainId: 'sendgrid-dev-domain',
                inboundRoutingAddress: 'support@acme-support.dev',
                dnsRecords: [
                    { host: '_sendgrid.acme-support.dev', type: 'CNAME', expectedValue: 'sendgrid.net.', status: 'verified' },
                    { host: 'acme-support.dev', type: 'TXT', expectedValue: 'v=spf1 sendgrid.net ~all', status: 'verified' },
                ],
            },
        },
        update: {},
    });
    console.log(`  ✔ Email channel configured for ${org.name}`);
    const passwordHash = await bcrypt.hash('password123', 10);
    const [alex, dana, morgan] = await Promise.all([
        prisma.user.upsert({
            where: { organizationId_email: { organizationId: org.id, email: 'alex@acme.com' } },
            create: {
                id: 'user_alex', organizationId: org.id,
                email: 'alex@acme.com', name: 'Alex Chen',
                passwordHash, role: 'AGENT', status: 'AVAILABLE',
            },
            update: {},
        }),
        prisma.user.upsert({
            where: { organizationId_email: { organizationId: org.id, email: 'dana@acme.com' } },
            create: {
                id: 'user_dana', organizationId: org.id,
                email: 'dana@acme.com', name: 'Dana Park',
                passwordHash, role: 'AGENT', status: 'AVAILABLE',
            },
            update: {},
        }),
        prisma.user.upsert({
            where: { organizationId_email: { organizationId: org.id, email: 'morgan@acme.com' } },
            create: {
                id: 'user_morgan', organizationId: org.id,
                email: 'morgan@acme.com', name: 'Morgan Lee',
                passwordHash, role: 'ADMIN', status: 'AVAILABLE',
            },
            update: {},
        }),
    ]);
    console.log(`  ✔ Users: ${[alex, dana, morgan].map((u) => u.name).join(', ')}`);
    console.log('    Login password for seeded users: password123');
    await prisma.slaPolicy.upsert({
        where: { id: 'sla_default' },
        create: {
            id: 'sla_default',
            organizationId: org.id,
            name: 'Default support SLA',
            firstResponseMinutes: 60,
            resolutionMinutes: 1440,
        },
        update: {
            firstResponseMinutes: 60,
            resolutionMinutes: 1440,
        },
    });
    const customerData = [
        { id: 'cust_1', name: 'Sarah Kowalski', email: 'sarah.k@example.com' },
        { id: 'cust_2', name: 'Marcus Webb', email: 'marcus.w@example.com' },
        { id: 'cust_3', name: 'Priya Nair', email: 'priya.n@example.com' },
        { id: 'cust_4', name: "James O'Brien", email: 'james.o@example.com' },
        { id: 'cust_5', name: 'Elena Vasquez', email: 'elena.v@example.com' },
        { id: 'cust_6', name: 'Tom Adeyemi', email: 'tom.a@example.com' },
        { id: 'cust_7', name: 'Rachel Kim', email: 'rachel.k@example.com' },
        { id: 'cust_8', name: 'Carlos Mendez', email: 'carlos.m@example.com' },
        { id: 'cust_9', name: 'Fatima Al-Rashid', email: 'fatima.r@example.com' },
        { id: 'cust_10', name: 'Liam Foster', email: 'liam.f@example.com' },
    ];
    const customers = {};
    for (const c of customerData) {
        customers[c.id] = await prisma.customer.upsert({
            where: { organizationId_email: { organizationId: org.id, email: c.email } },
            create: { id: c.id, organizationId: org.id, name: c.name, email: c.email },
            update: {},
        });
    }
    console.log(`  ✔ Customers: ${customerData.length} created`);
    const tickets = [
        {
            id: 'tkt_001', custId: 'cust_1', subject: 'Order #8821 not delivered',
            firstMsg: "Hi, my order was supposed to arrive yesterday but the tracking shows it hasn't moved in 3 days.",
            channel: 'EMAIL', status: 'OPEN', priority: 'URGENT', aiStatus: 'SUGGESTED',
            tags: ['shipping', 'urgent'], assigneeId: alex.id,
        },
        {
            id: 'tkt_002', custId: 'cust_2', subject: 'Refund for damaged item',
            firstMsg: 'I received my package and the screen is completely cracked. I need a full refund immediately.',
            channel: 'CHAT', status: 'OPEN', priority: 'HIGH', aiStatus: 'NONE',
            tags: ['refund', 'damage'], assigneeId: null,
        },
        {
            id: 'tkt_003', custId: 'cust_3', subject: "Can't reset my password",
            firstMsg: "I've tried the reset link 3 times but I never get the email. My account is pnair@company.com.",
            channel: 'EMAIL', status: 'OPEN', priority: 'NORMAL', aiStatus: 'RESOLVED',
            tags: ['account', 'auth'], assigneeId: null,
        },
        {
            id: 'tkt_004', custId: 'cust_4', subject: 'Wrong item received',
            firstMsg: 'You sent me size L but I ordered size M. This is the second time this happens.',
            channel: 'WHATSAPP', status: 'PENDING', priority: 'HIGH', aiStatus: 'SUGGESTED',
            tags: ['shipping', 'order'], assigneeId: alex.id,
        },
        {
            id: 'tkt_005', custId: 'cust_5', subject: 'Billing charged twice in June',
            firstMsg: 'I see two charges on June 14th for $49.99 each. My subscription should only be charged once monthly.',
            channel: 'EMAIL', status: 'OPEN', priority: 'URGENT', aiStatus: 'NONE',
            tags: ['billing', 'duplicate'], assigneeId: null,
        },
        {
            id: 'tkt_006', custId: 'cust_6', subject: 'How do I export my data?',
            firstMsg: 'Hi, I want to export all my purchase history and receipts as a PDF or CSV.',
            channel: 'CHAT', status: 'OPEN', priority: 'LOW', aiStatus: 'RESOLVED',
            tags: ['product'], assigneeId: null,
        },
        {
            id: 'tkt_007', custId: 'cust_7', subject: 'VIP upgrade not applied',
            firstMsg: 'I was promised VIP status after my 10th purchase but my account still shows standard tier.',
            channel: 'EMAIL', status: 'PENDING', priority: 'HIGH', aiStatus: 'SUGGESTED',
            tags: ['VIP', 'account'], assigneeId: dana.id,
        },
        {
            id: 'tkt_008', custId: 'cust_8', subject: 'Product stopped working after 2 weeks',
            firstMsg: 'Bought the wireless earbuds and the right one completely stopped working. Need replacement or refund.',
            channel: 'WHATSAPP', status: 'OPEN', priority: 'HIGH', aiStatus: 'NONE',
            tags: ['defect', 'refund'], assigneeId: alex.id,
        },
        {
            id: 'tkt_009', custId: 'cust_9', subject: 'Cancel subscription before renewal',
            firstMsg: 'I need to cancel before my renewal date on July 1st. I cannot find the cancel button anywhere.',
            channel: 'EMAIL', status: 'OPEN', priority: 'NORMAL', aiStatus: 'RESOLVED',
            tags: ['billing', 'cancel'], assigneeId: null,
        },
        {
            id: 'tkt_010', custId: 'cust_10', subject: 'App crashes on Android 14',
            firstMsg: 'Since updating to Android 14 the app crashes every time I try to checkout. Running Samsung S24.',
            channel: 'CHAT', status: 'OPEN', priority: 'URGENT', aiStatus: 'NONE',
            tags: ['bug', 'mobile'], assigneeId: dana.id,
        },
        {
            id: 'tkt_011', custId: 'cust_1', subject: 'Invoice missing company VAT number',
            firstMsg: 'My company needs a proper invoice with VAT number for accounting.',
            channel: 'EMAIL', status: 'PENDING', priority: 'NORMAL', aiStatus: 'SUGGESTED',
            tags: ['billing', 'invoice'], assigneeId: alex.id,
        },
        {
            id: 'tkt_012', custId: 'cust_2', subject: 'Package delivered to wrong address',
            firstMsg: 'The courier left my package at the wrong house. My neighbor has it but refuses to hand it over.',
            channel: 'WHATSAPP', status: 'OPEN', priority: 'HIGH', aiStatus: 'NONE',
            tags: ['shipping', 'delivery'], assigneeId: null,
        },
        {
            id: 'tkt_013', custId: 'cust_3', subject: 'Promo code not working at checkout',
            firstMsg: 'Tried using SAVE20 but it says invalid. I got this code in your newsletter last week.',
            channel: 'EMAIL', status: 'SOLVED', priority: 'LOW', aiStatus: 'RESOLVED',
            tags: ['promo', 'order'], assigneeId: dana.id,
        },
        {
            id: 'tkt_014', custId: 'cust_4', subject: 'Upgrade plan mid-cycle',
            firstMsg: 'I want to upgrade from Basic to Pro mid-month. Will I be charged the difference or the full amount?',
            channel: 'CHAT', status: 'SOLVED', priority: 'NORMAL', aiStatus: 'RESOLVED',
            tags: ['billing', 'upgrade'], assigneeId: null,
        },
        {
            id: 'tkt_015', custId: 'cust_5', subject: 'Accessibility request: screen reader issues',
            firstMsg: 'Your checkout page is not compatible with VoiceOver on iOS. Several buttons have no accessible labels.',
            channel: 'EMAIL', status: 'OPEN', priority: 'HIGH', aiStatus: 'NONE',
            tags: ['accessibility', 'bug'], assigneeId: alex.id,
        },
        {
            id: 'tkt_016', custId: 'cust_6', subject: 'Gift card balance not showing',
            firstMsg: 'I redeemed a $50 gift card but my account balance still shows zero. Transaction ID: GC-74821.',
            channel: 'WHATSAPP', status: 'CLOSED', priority: 'NORMAL', aiStatus: 'RESOLVED',
            tags: ['billing', 'gift card'], assigneeId: dana.id,
        },
    ];
    let created = 0;
    for (const t of tickets) {
        const custId = customers[t.custId]?.id ?? t.custId;
        const existing = await prisma.ticket.findFirst({ where: { id: t.id } });
        if (existing) {
            created++;
            continue;
        }
        const conv = await prisma.conversation.create({
            data: {
                organizationId: org.id,
                customerId: custId,
                channel: t.channel,
            },
        });
        await prisma.message.create({
            data: {
                organizationId: org.id,
                conversationId: conv.id,
                direction: 'INBOUND',
                body: t.firstMsg,
                authorType: 'CUSTOMER',
                authorId: custId,
            },
        });
        await prisma.ticket.create({
            data: {
                id: t.id,
                organizationId: org.id,
                conversationId: conv.id,
                customerId: custId,
                subject: t.subject,
                channel: t.channel,
                status: t.status,
                priority: t.priority,
                aiStatus: t.aiStatus,
                tags: [...t.tags],
                assigneeId: t.assigneeId ?? null,
                ...(t.status === 'SOLVED' || t.status === 'CLOSED' ? { solvedAt: new Date() } : {}),
            },
        });
        created++;
    }
    console.log(`  ✔ Tickets: ${created} seeded`);
    const knowledge = [
        {
            id: 'kb_shipping',
            title: 'Shipping delays and missing packages',
            body: 'Apologize, verify tracking, check courier status, and offer replacement or escalation when tracking has not moved for more than 72 hours.',
            tags: ['shipping', 'delivery'],
        },
        {
            id: 'kb_refunds',
            title: 'Refund and damaged item policy',
            body: 'Request photos for damaged items, confirm the order number, and offer refund or replacement according to warranty status.',
            tags: ['refund', 'damage'],
        },
        {
            id: 'kb_billing',
            title: 'Billing and duplicate charges',
            body: 'Confirm invoice details, check subscription billing events, and reverse duplicate charges after payment verification.',
            tags: ['billing', 'invoice'],
        },
        {
            id: 'kb_accounts',
            title: 'Account access and password reset',
            body: 'Ask the customer to check spam, verify the account email, and issue a fresh password reset link when needed.',
            tags: ['account', 'auth'],
        },
    ];
    for (const article of knowledge) {
        await prisma.knowledgeArticle.upsert({
            where: { id: article.id },
            create: {
                ...article,
                organizationId: org.id,
                embedding: article.body.toLowerCase().split(/\s+/).slice(0, 64),
            },
            update: {
                title: article.title,
                body: article.body,
                tags: article.tags,
                embedding: article.body.toLowerCase().split(/\s+/).slice(0, 64),
                freshnessUpdatedAt: new Date(),
            },
        });
    }
    console.log(`  ✔ Knowledge articles: ${knowledge.length} seeded`);
    console.log(`\n✅ Seed complete. Default org ID: ${org.id}`);
    console.log(`   Add DEFAULT_ORG_ID=${org.id} to your .env if not already set.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map
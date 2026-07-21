--
-- PostgreSQL database dump
--

\restrict eGINp36TdbxebJUD1HvUDWFhc6GGcFa1gQWQKHoAJCdxY1PXXD9Doc0YF12AnCm

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-07-20 17:33:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 241 (class 1259 OID 29664)
-- Name: CareerPartners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CareerPartners" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    logo_url character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."CareerPartners" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 29663)
-- Name: CareerPartners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CareerPartners_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CareerPartners_id_seq" OWNER TO postgres;

--
-- TOC entry 5325 (class 0 OID 0)
-- Dependencies: 240
-- Name: CareerPartners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CareerPartners_id_seq" OWNED BY public."CareerPartners".id;


--
-- TOC entry 224 (class 1259 OID 27489)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    name character varying(100),
    email character varying(150) NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 27488)
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- TOC entry 5326 (class 0 OID 0)
-- Dependencies: 223
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- TOC entry 226 (class 1259 OID 27613)
-- Name: banners; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banners (
    id integer NOT NULL,
    title character varying(255),
    image character varying(255),
    created_at timestamp with time zone NOT NULL,
    is_active boolean DEFAULT true,
    subtitle text,
    button_text character varying(100),
    button_link character varying(255),
    title_color character varying(20) DEFAULT '#FFFFFF'::character varying,
    subtitle_color character varying(20) DEFAULT '#FFFFFF'::character varying
);


ALTER TABLE public.banners OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 27612)
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.banners_id_seq OWNER TO postgres;

--
-- TOC entry 5327 (class 0 OID 0)
-- Dependencies: 225
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- TOC entry 243 (class 1259 OID 30472)
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    content text,
    author character varying(255),
    cover_image_url character varying(255),
    is_published boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 30471)
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blogs_id_seq OWNER TO postgres;

--
-- TOC entry 5328 (class 0 OID 0)
-- Dependencies: 242
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- TOC entry 239 (class 1259 OID 28747)
-- Name: brochures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brochures (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    file_url character varying(255) NOT NULL,
    file_size character varying(50),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.brochures OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 28746)
-- Name: brochures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brochures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.brochures_id_seq OWNER TO postgres;

--
-- TOC entry 5329 (class 0 OID 0)
-- Dependencies: 238
-- Name: brochures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brochures_id_seq OWNED BY public.brochures.id;


--
-- TOC entry 233 (class 1259 OID 27925)
-- Name: course_section_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_section_items (
    id integer NOT NULL,
    section_id integer NOT NULL,
    content character varying(500) NOT NULL,
    display_order integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.course_section_items OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 27924)
-- Name: course_section_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_section_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_section_items_id_seq OWNER TO postgres;

--
-- TOC entry 5330 (class 0 OID 0)
-- Dependencies: 232
-- Name: course_section_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_section_items_id_seq OWNED BY public.course_section_items.id;


--
-- TOC entry 231 (class 1259 OID 27912)
-- Name: course_sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_sections (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    display_order integer DEFAULT 0,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.course_sections OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 27911)
-- Name: course_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.course_sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.course_sections_id_seq OWNER TO postgres;

--
-- TOC entry 5331 (class 0 OID 0)
-- Dependencies: 230
-- Name: course_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.course_sections_id_seq OWNED BY public.course_sections.id;


--
-- TOC entry 245 (class 1259 OID 31753)
-- Name: google_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.google_reviews (
    id integer NOT NULL,
    google_review_id character varying(255) NOT NULL,
    author_name character varying(255) NOT NULL,
    rating integer NOT NULL,
    review text,
    profile_photo character varying(255),
    review_time timestamp with time zone NOT NULL,
    featured boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    average_rating double precision,
    total_reviews integer,
    last_sync timestamp with time zone
);


ALTER TABLE public.google_reviews OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 31752)
-- Name: google_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.google_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.google_reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5332 (class 0 OID 0)
-- Dependencies: 244
-- Name: google_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.google_reviews_id_seq OWNED BY public.google_reviews.id;


--
-- TOC entry 235 (class 1259 OID 28473)
-- Name: popups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.popups (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    image character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.popups OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 28472)
-- Name: popups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.popups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.popups_id_seq OWNER TO postgres;

--
-- TOC entry 5333 (class 0 OID 0)
-- Dependencies: 234
-- Name: popups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.popups_id_seq OWNED BY public.popups.id;


--
-- TOC entry 228 (class 1259 OID 27699)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    name character varying(150),
    email character varying(150),
    rating integer,
    review text,
    status character varying(20) DEFAULT 'Pending'::character varying,
    created_at timestamp with time zone NOT NULL,
    company character varying(150),
    designation character varying(150),
    photo character varying(255),
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
    CONSTRAINT reviews_status_check CHECK (((status)::text = ANY (ARRAY[('Pending'::character varying)::text, ('Approved'::character varying)::text, ('Rejected'::character varying)::text])))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 27698)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 5334 (class 0 OID 0)
-- Dependencies: 227
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 229 (class 1259 OID 27871)
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    key character varying(50) NOT NULL,
    value character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 28542)
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    name character varying(150),
    company character varying(150),
    designation character varying(150),
    message text,
    image character varying(255),
    status boolean DEFAULT true,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 28541)
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.testimonials_id_seq OWNER TO postgres;

--
-- TOC entry 5335 (class 0 OID 0)
-- Dependencies: 236
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- TOC entry 4931 (class 2604 OID 29667)
-- Name: CareerPartners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CareerPartners" ALTER COLUMN id SET DEFAULT nextval('public."CareerPartners_id_seq"'::regclass);


--
-- TOC entry 4914 (class 2604 OID 27492)
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 27616)
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- TOC entry 4933 (class 2604 OID 30475)
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- TOC entry 4929 (class 2604 OID 28750)
-- Name: brochures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brochures ALTER COLUMN id SET DEFAULT nextval('public.brochures_id_seq'::regclass);


--
-- TOC entry 4923 (class 2604 OID 27928)
-- Name: course_section_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_section_items ALTER COLUMN id SET DEFAULT nextval('public.course_section_items_id_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 27915)
-- Name: course_sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_sections ALTER COLUMN id SET DEFAULT nextval('public.course_sections_id_seq'::regclass);


--
-- TOC entry 4935 (class 2604 OID 31756)
-- Name: google_reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews ALTER COLUMN id SET DEFAULT nextval('public.google_reviews_id_seq'::regclass);


--
-- TOC entry 4925 (class 2604 OID 28476)
-- Name: popups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.popups ALTER COLUMN id SET DEFAULT nextval('public.popups_id_seq'::regclass);


--
-- TOC entry 4919 (class 2604 OID 27702)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4927 (class 2604 OID 28545)
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- TOC entry 5315 (class 0 OID 29664)
-- Dependencies: 241
-- Data for Name: CareerPartners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CareerPartners" (id, name, logo_url, is_active, "createdAt", "updatedAt") FROM stdin;
1	Ibm	uploads/partners/partnerLogo-1784196237827.png	t	2026-07-16 15:33:57.841+05:30	2026-07-16 15:33:57.841+05:30
2	S	uploads/partners/partnerLogo-1784196248123.webp	t	2026-07-16 15:34:08.126+05:30	2026-07-16 15:34:08.126+05:30
3	C	uploads/partners/partnerLogo-1784196255424.webp	t	2026-07-16 15:34:15.427+05:30	2026-07-16 15:34:15.427+05:30
4	T	uploads/partners/partnerLogo-1784196263091.webp	t	2026-07-16 15:34:23.093+05:30	2026-07-16 15:34:23.093+05:30
5	I	uploads/partners/partnerLogo-1784196273691.png	t	2026-07-16 15:34:33.694+05:30	2026-07-16 15:34:33.694+05:30
6	s	uploads/partners/partnerLogo-1784196303594.png	t	2026-07-16 15:35:03.597+05:30	2026-07-16 15:35:03.597+05:30
7	g	uploads/partners/partnerLogo-1784196424324.png	t	2026-07-16 15:37:04.327+05:30	2026-07-16 15:37:04.327+05:30
8	h	uploads/partners/partnerLogo-1784196430498.png	t	2026-07-16 15:37:10.499+05:30	2026-07-16 15:37:10.499+05:30
9	v	uploads/partners/partnerLogo-1784196437844.png	t	2026-07-16 15:37:17.847+05:30	2026-07-16 15:37:17.847+05:30
10	u	uploads/partners/partnerLogo-1784196445231.webp	t	2026-07-16 15:37:25.233+05:30	2026-07-16 15:37:25.233+05:30
11	j	uploads/partners/partnerLogo-1784196453226.png	t	2026-07-16 15:37:33.231+05:30	2026-07-16 15:37:33.231+05:30
12	h	uploads/partners/partnerLogo-1784196465751.png	t	2026-07-16 15:37:45.753+05:30	2026-07-16 15:37:45.753+05:30
\.


--
-- TOC entry 5298 (class 0 OID 27489)
-- Dependencies: 224
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, name, email, password, created_at) FROM stdin;
1	Admin	admin@siliconvista.com	$2b$10$ugx20NjWxVJYvHQtUtHJd.7XEHEsr88zUu.YhkM4Tn.GgQqWy6Yba	2026-07-15 17:10:48.326774+05:30
\.


--
-- TOC entry 5300 (class 0 OID 27613)
-- Dependencies: 226
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banners (id, title, image, created_at, is_active, subtitle, button_text, button_link, title_color, subtitle_color) FROM stdin;
13	Silicon Vista	uploads/banner/bannerImage-1784273273848.png	2026-07-16 11:13:03.076+05:30	t	Hands-on projects with real tools\r\nCourses for freshers & professionals\r\nInternship aligned with placement preparation\r\nMentorship from working VLSI engineers\r\nInternship on live VLSI projects\r\nInternship certificate upon completion	\N	\N	#ffffff	#ffffff
15	Silicon Vista	uploads/banner/bannerImage-1784530874696.jpg	2026-07-20 12:31:14.699+05:30	t		\N	\N	#FFFFFF	#FFFFFF
14	Silicon Vista	uploads/banner/bannerImage-1784530826458.jpg	2026-07-16 11:29:01.664+05:30	t		\N	\N	#ffffff	#ffffff
\.


--
-- TOC entry 5317 (class 0 OID 30472)
-- Dependencies: 243
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blogs (id, title, description, content, author, cover_image_url, is_published, "createdAt", "updatedAt") FROM stdin;
1	The Future of VLSI: Driving Innovation in Chip Design	An overview of how VLSI technology is shaping modern computing, from microprocessors to AI accelerators.	\r\nVLSI (Very Large Scale Integration) has revolutionized the semiconductor industry by enabling millions of transistors to be integrated onto a single chip. This advancement has paved the way for powerful microprocessors, memory devices, and specialized hardware accelerators.\r\n\r\nKey areas where VLSI is making an impact include:\r\n\r\nArtificial Intelligence & Machine Learning: Custom VLSI designs for GPUs and TPUs accelerate deep learning workloads.\r\n\r\nIoT & Edge Devices: Compact, low-power VLSI chips drive smart sensors and embedded systems.\r\n\r\nQuantum-Safe Security: Hardware-level cryptographic modules designed with VLSI ensure resilience against future quantum attacks.\r\n\r\nEnergy Efficiency: Modern VLSI techniques focus on reducing power consumption while maintaining performance, critical for mobile and wearable devices.\r\n	Ragul Sankar	uploads/blogs/blogImage-1784203159690.webp	t	2026-07-16 17:29:19.701+05:30	2026-07-16 17:29:19.701+05:30
2	The Power of Continuous Learning in Tech	A quick dive into why lifelong learning is the backbone of success in the fast-changing world of technology.	In today’s digital era, technology evolves faster than ever. Frameworks, languages, and tools that dominate today may be outdated tomorrow. For developers, engineers, and innovators, continuous learning isn’t just an option—it’s a necessity.\r\n\r\nKnowledge in tech is like fuel: it powers creativity, problem-solving, and adaptability. By consistently upgrading skills—whether through online courses, hands-on projects, or peer collaboration—professionals stay relevant and competitive.\r\n\r\nBeyond career growth, continuous learning fosters curiosity and resilience. It helps us embrace challenges, experiment with new ideas, and build solutions that matter. In short, learning is the bridge between where we are and where we want to be in the future of technology.	Ragul Sankar	uploads/blogs/blogImage-1784280205840.jpg	t	2026-07-17 14:53:25.842+05:30	2026-07-17 14:53:25.842+05:30
\.


--
-- TOC entry 5313 (class 0 OID 28747)
-- Dependencies: 239
-- Data for Name: brochures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.brochures (id, title, file_url, file_size, is_active, created_at) FROM stdin;
2	VLSI Program Details	uploads/brochure/brochureFile-1784193327023.webp	18.87 KB	t	2026-07-16 14:45:27.032+05:30
3	Full Stack Development	uploads/brochure/brochureFile-1784278014602.webp	102.09 KB	t	2026-07-16 15:10:32.856+05:30
4	web dev	uploads/brochure/brochureFile-1784278027929.png	2.12 MB	f	2026-07-17 14:17:07.96+05:30
\.


--
-- TOC entry 5307 (class 0 OID 27925)
-- Dependencies: 233
-- Data for Name: course_section_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_section_items (id, section_id, content, display_order, "createdAt", "updatedAt") FROM stdin;
2	1	ASIC/FPGA Technologies & Flow	1	2026-07-15 15:51:27.221+05:30	2026-07-15 15:51:27.221+05:30
3	1	EDA Tools	2	2026-07-15 15:51:39.187+05:30	2026-07-15 15:51:39.187+05:30
4	2	Introduction to Digital Systems	1	2026-07-15 15:52:19.49+05:30	2026-07-15 15:52:19.49+05:30
5	2	Logic Simplification	2	2026-07-15 15:52:31.07+05:30	2026-07-15 15:52:31.07+05:30
6	2	Sequential Logic – Basics	3	2026-07-15 15:52:42.376+05:30	2026-07-15 15:52:42.376+05:30
7	2	Finite State Machines (FSM)	4	2026-07-15 15:52:55.283+05:30	2026-07-15 15:52:55.283+05:30
8	2	Boolean Algebra & Logic Gates	5	2026-07-15 15:53:12.155+05:30	2026-07-15 15:53:12.155+05:30
9	2	Combinational Logic Circuits	6	2026-07-15 15:53:25.251+05:30	2026-07-15 15:53:25.251+05:30
10	2	Counters & Registers	7	2026-07-15 15:53:36.394+05:30	2026-07-15 15:53:36.394+05:30
\.


--
-- TOC entry 5305 (class 0 OID 27912)
-- Dependencies: 231
-- Data for Name: course_sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_sections (id, title, display_order, "createdAt", "updatedAt") FROM stdin;
1	Semiconductor Introduction	0	2026-07-15 15:50:36.044+05:30	2026-07-15 15:50:51.183+05:30
2	Introduction to Digital Systems	2	2026-07-15 15:52:10.605+05:30	2026-07-15 15:52:10.605+05:30
\.


--
-- TOC entry 5319 (class 0 OID 31753)
-- Dependencies: 245
-- Data for Name: google_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.google_reviews (id, google_review_id, author_name, rating, review, profile_photo, review_time, featured, created_at, updated_at, average_rating, total_reviews, last_sync) FROM stdin;
1	mock_1	John Doe	5	Excellent Course and Training!	https://lh3.googleusercontent.com/a/ACg8ocLQ...	2026-07-18 12:16:57+05:30	t	2026-07-20 12:16:57.023+05:30	2026-07-20 15:21:38.608+05:30	\N	\N	\N
2	mock_2	David Smith	5	Very Nice Training, highly recommended.	https://lh3.googleusercontent.com/a/ACg8ocLQ...	2026-07-15 12:16:57+05:30	t	2026-07-20 12:16:57.326+05:30	2026-07-20 15:21:39.501+05:30	\N	\N	\N
3	mock_3	Sarah Jenkins	4	Good course, but could use more practical exercises.	https://lh3.googleusercontent.com/a/ACg8ocLQ...	2026-07-10 12:16:57+05:30	t	2026-07-20 12:16:57.337+05:30	2026-07-20 15:29:06.091+05:30	\N	\N	\N
\.


--
-- TOC entry 5309 (class 0 OID 28473)
-- Dependencies: 235
-- Data for Name: popups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.popups (id, title, description, image, is_active, created_at) FROM stdin;
1	First Batch Training Aug-22	Stay updated with our latest announcements and training schedules. This popup ensures you never miss important updates or events.	uploads/popupImage-1784182836271.webp	f	2026-07-16 11:50:36.28+05:30
\.


--
-- TOC entry 5302 (class 0 OID 27699)
-- Dependencies: 228
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, name, email, rating, review, status, created_at, company, designation, photo) FROM stdin;
3	Karan	\N	4	Unlike other institutes, SiliconVista focuses on real-time projects and industry tools. The internship program was mentor-led and gave me practical exposure that added strong value to my resume.	Pending	2026-07-15 14:45:38.261+05:30	\N	\N	uploads/reviews/photo-1784106938256.webp
6	Karthika Nataraj	\N	5	As an ECE student, I found the VLSI program extremely useful. The curriculum is industry-aligned and doesn’t just require coding knowledge—it’s structured to make you job-ready.	Rejected	2026-07-15 14:47:28.909+05:30	\N	\N	uploads/reviews/photo-1784107048906.png
2	Ragul Sankar	\N	5	SiliconVista bridges the gap between theory and industry practice. The hands-on projects and expert mentorship gave me confidence to tackle real-world VLSI challenges. Highly recommend for anyone serious about a career in chip design.	Approved	2026-07-15 14:45:09.805+05:30	\N	\N	uploads/reviews/photo-1784106909799.png
5	Deepak	\N	5	The government-certified courses at SiliconVista are not just about certificates—they genuinely prepare you for the job market. The trusted certification added credibility to my profile.	Approved	2026-07-15 14:46:54.707+05:30	\N	\N	uploads/reviews/photo-1784107014703.webp
4	Harish	\N	2	Learning directly from semiconductor industry professionals made all the difference. The one-on-one guidance ensured I understood every concept deeply and progressed with confidence.	Approved	2026-07-15 14:46:27.292+05:30	\N	\N	uploads/reviews/photo-1784106987290.jpg
8	Haram Hajj	\N	5	SiliconVista’s advanced VLSI design verification courses gave me both skills and confidence. The combination of real-time projects, internships, and expert mentors makes it the best choice for freshers and professionals alike.	Approved	2026-07-15 14:48:25.119+05:30	\N	\N	uploads/reviews/photo-1784107105115.png
7	Arjun Murugan	\N	5	SiliconVista’s advanced VLSI design verification courses gave me both skills and confidence. The combination of real-time projects, internships, and expert mentors makes it the best choice for freshers and professionals alike.	Approved	2026-07-15 14:47:58.84+05:30	\N	\N	uploads/reviews/photo-1784107078834.png
9	Kalpana	\N	5	Learning directly from semiconductor industry professionals made all the difference. The one-on-one guidance ensured I understood every concept deeply and progressed with confidence.	Pending	2026-07-15 16:47:09.806+05:30	\N	\N	uploads/reviews/photo-1784114229743.png
10	Ravina	\N	5	I had an outstanding experience with Ravina. Her professionalism, attention to detail, and commitment to delivering quality work truly stood out. She was responsive, reliable, and went above and beyond to ensure everything was handled perfectly. I would highly recommend her services to anyone looking for excellence and dedication.	Approved	2026-07-20 12:10:00.673+05:30	\N	\N	uploads/reviews/photo-1784529600661.png
\.


--
-- TOC entry 5303 (class 0 OID 27871)
-- Dependencies: 229
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (key, value, "createdAt", "updatedAt") FROM stdin;
show_review_section	true	2026-07-15 15:25:31.034+05:30	2026-07-15 17:32:19.466+05:30
\.


--
-- TOC entry 5311 (class 0 OID 28542)
-- Dependencies: 237
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, name, company, designation, message, image, status, created_at) FROM stdin;
\.


--
-- TOC entry 5336 (class 0 OID 0)
-- Dependencies: 240
-- Name: CareerPartners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CareerPartners_id_seq"', 12, true);


--
-- TOC entry 5337 (class 0 OID 0)
-- Dependencies: 223
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 1, true);


--
-- TOC entry 5338 (class 0 OID 0)
-- Dependencies: 225
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banners_id_seq', 16, true);


--
-- TOC entry 5339 (class 0 OID 0)
-- Dependencies: 242
-- Name: blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blogs_id_seq', 2, true);


--
-- TOC entry 5340 (class 0 OID 0)
-- Dependencies: 238
-- Name: brochures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brochures_id_seq', 5, true);


--
-- TOC entry 5341 (class 0 OID 0)
-- Dependencies: 232
-- Name: course_section_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_section_items_id_seq', 10, true);


--
-- TOC entry 5342 (class 0 OID 0)
-- Dependencies: 230
-- Name: course_sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.course_sections_id_seq', 2, true);


--
-- TOC entry 5343 (class 0 OID 0)
-- Dependencies: 244
-- Name: google_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.google_reviews_id_seq', 3, true);


--
-- TOC entry 5344 (class 0 OID 0)
-- Dependencies: 234
-- Name: popups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.popups_id_seq', 1, true);


--
-- TOC entry 5345 (class 0 OID 0)
-- Dependencies: 227
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 10, true);


--
-- TOC entry 5346 (class 0 OID 0)
-- Dependencies: 236
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 1, false);


--
-- TOC entry 5080 (class 2606 OID 29677)
-- Name: CareerPartners CareerPartners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CareerPartners"
    ADD CONSTRAINT "CareerPartners_pkey" PRIMARY KEY (id);


--
-- TOC entry 4940 (class 2606 OID 35949)
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- TOC entry 4942 (class 2606 OID 35951)
-- Name: admins admins_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key1 UNIQUE (email);


--
-- TOC entry 4944 (class 2606 OID 35995)
-- Name: admins admins_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key10 UNIQUE (email);


--
-- TOC entry 4946 (class 2606 OID 35947)
-- Name: admins admins_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key11 UNIQUE (email);


--
-- TOC entry 4948 (class 2606 OID 35997)
-- Name: admins admins_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key12 UNIQUE (email);


--
-- TOC entry 4950 (class 2606 OID 35935)
-- Name: admins admins_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key13 UNIQUE (email);


--
-- TOC entry 4952 (class 2606 OID 35933)
-- Name: admins admins_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key14 UNIQUE (email);


--
-- TOC entry 4954 (class 2606 OID 35999)
-- Name: admins admins_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key15 UNIQUE (email);


--
-- TOC entry 4956 (class 2606 OID 35927)
-- Name: admins admins_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key16 UNIQUE (email);


--
-- TOC entry 4958 (class 2606 OID 35925)
-- Name: admins admins_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key17 UNIQUE (email);


--
-- TOC entry 4960 (class 2606 OID 36001)
-- Name: admins admins_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key18 UNIQUE (email);


--
-- TOC entry 4962 (class 2606 OID 35909)
-- Name: admins admins_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key19 UNIQUE (email);


--
-- TOC entry 4964 (class 2606 OID 35953)
-- Name: admins admins_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key2 UNIQUE (email);


--
-- TOC entry 4966 (class 2606 OID 35923)
-- Name: admins admins_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key20 UNIQUE (email);


--
-- TOC entry 4968 (class 2606 OID 35921)
-- Name: admins admins_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key21 UNIQUE (email);


--
-- TOC entry 4970 (class 2606 OID 35919)
-- Name: admins admins_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key22 UNIQUE (email);


--
-- TOC entry 4972 (class 2606 OID 35911)
-- Name: admins admins_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key23 UNIQUE (email);


--
-- TOC entry 4974 (class 2606 OID 35917)
-- Name: admins admins_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key24 UNIQUE (email);


--
-- TOC entry 4976 (class 2606 OID 35913)
-- Name: admins admins_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key25 UNIQUE (email);


--
-- TOC entry 4978 (class 2606 OID 35915)
-- Name: admins admins_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key26 UNIQUE (email);


--
-- TOC entry 4980 (class 2606 OID 35985)
-- Name: admins admins_email_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key27 UNIQUE (email);


--
-- TOC entry 4982 (class 2606 OID 35977)
-- Name: admins admins_email_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key28 UNIQUE (email);


--
-- TOC entry 4984 (class 2606 OID 35983)
-- Name: admins admins_email_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key29 UNIQUE (email);


--
-- TOC entry 4986 (class 2606 OID 35955)
-- Name: admins admins_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key3 UNIQUE (email);


--
-- TOC entry 4988 (class 2606 OID 35979)
-- Name: admins admins_email_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key30 UNIQUE (email);


--
-- TOC entry 4990 (class 2606 OID 35981)
-- Name: admins admins_email_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key31 UNIQUE (email);


--
-- TOC entry 4992 (class 2606 OID 35937)
-- Name: admins admins_email_key32; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key32 UNIQUE (email);


--
-- TOC entry 4994 (class 2606 OID 35945)
-- Name: admins admins_email_key33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key33 UNIQUE (email);


--
-- TOC entry 4996 (class 2606 OID 35939)
-- Name: admins admins_email_key34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key34 UNIQUE (email);


--
-- TOC entry 4998 (class 2606 OID 35941)
-- Name: admins admins_email_key35; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key35 UNIQUE (email);


--
-- TOC entry 5000 (class 2606 OID 35943)
-- Name: admins admins_email_key36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key36 UNIQUE (email);


--
-- TOC entry 5002 (class 2606 OID 35931)
-- Name: admins admins_email_key37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key37 UNIQUE (email);


--
-- TOC entry 5004 (class 2606 OID 35929)
-- Name: admins admins_email_key38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key38 UNIQUE (email);


--
-- TOC entry 5006 (class 2606 OID 35975)
-- Name: admins admins_email_key39; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key39 UNIQUE (email);


--
-- TOC entry 5008 (class 2606 OID 35957)
-- Name: admins admins_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key4 UNIQUE (email);


--
-- TOC entry 5010 (class 2606 OID 36003)
-- Name: admins admins_email_key40; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key40 UNIQUE (email);


--
-- TOC entry 5012 (class 2606 OID 35973)
-- Name: admins admins_email_key41; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key41 UNIQUE (email);


--
-- TOC entry 5014 (class 2606 OID 35971)
-- Name: admins admins_email_key42; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key42 UNIQUE (email);


--
-- TOC entry 5016 (class 2606 OID 36005)
-- Name: admins admins_email_key43; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key43 UNIQUE (email);


--
-- TOC entry 5018 (class 2606 OID 36007)
-- Name: admins admins_email_key44; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key44 UNIQUE (email);


--
-- TOC entry 5020 (class 2606 OID 35969)
-- Name: admins admins_email_key45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key45 UNIQUE (email);


--
-- TOC entry 5022 (class 2606 OID 36009)
-- Name: admins admins_email_key46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key46 UNIQUE (email);


--
-- TOC entry 5024 (class 2606 OID 35967)
-- Name: admins admins_email_key47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key47 UNIQUE (email);


--
-- TOC entry 5026 (class 2606 OID 35965)
-- Name: admins admins_email_key48; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key48 UNIQUE (email);


--
-- TOC entry 5028 (class 2606 OID 36011)
-- Name: admins admins_email_key49; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key49 UNIQUE (email);


--
-- TOC entry 5030 (class 2606 OID 35959)
-- Name: admins admins_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key5 UNIQUE (email);


--
-- TOC entry 5032 (class 2606 OID 35963)
-- Name: admins admins_email_key50; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key50 UNIQUE (email);


--
-- TOC entry 5034 (class 2606 OID 36013)
-- Name: admins admins_email_key51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key51 UNIQUE (email);


--
-- TOC entry 5036 (class 2606 OID 35961)
-- Name: admins admins_email_key52; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key52 UNIQUE (email);


--
-- TOC entry 5038 (class 2606 OID 36015)
-- Name: admins admins_email_key53; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key53 UNIQUE (email);


--
-- TOC entry 5040 (class 2606 OID 36017)
-- Name: admins admins_email_key54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key54 UNIQUE (email);


--
-- TOC entry 5042 (class 2606 OID 35907)
-- Name: admins admins_email_key55; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key55 UNIQUE (email);


--
-- TOC entry 5044 (class 2606 OID 36019)
-- Name: admins admins_email_key56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key56 UNIQUE (email);


--
-- TOC entry 5046 (class 2606 OID 35905)
-- Name: admins admins_email_key57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key57 UNIQUE (email);


--
-- TOC entry 5048 (class 2606 OID 36021)
-- Name: admins admins_email_key58; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key58 UNIQUE (email);


--
-- TOC entry 5050 (class 2606 OID 35903)
-- Name: admins admins_email_key59; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key59 UNIQUE (email);


--
-- TOC entry 5052 (class 2606 OID 35987)
-- Name: admins admins_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key6 UNIQUE (email);


--
-- TOC entry 5054 (class 2606 OID 36023)
-- Name: admins admins_email_key60; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key60 UNIQUE (email);


--
-- TOC entry 5056 (class 2606 OID 35989)
-- Name: admins admins_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key7 UNIQUE (email);


--
-- TOC entry 5058 (class 2606 OID 35991)
-- Name: admins admins_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key8 UNIQUE (email);


--
-- TOC entry 5060 (class 2606 OID 35993)
-- Name: admins admins_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key9 UNIQUE (email);


--
-- TOC entry 5062 (class 2606 OID 27498)
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- TOC entry 5064 (class 2606 OID 27625)
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- TOC entry 5082 (class 2606 OID 30484)
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- TOC entry 5078 (class 2606 OID 28759)
-- Name: brochures brochures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brochures
    ADD CONSTRAINT brochures_pkey PRIMARY KEY (id);


--
-- TOC entry 5072 (class 2606 OID 27937)
-- Name: course_section_items course_section_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_section_items
    ADD CONSTRAINT course_section_items_pkey PRIMARY KEY (id);


--
-- TOC entry 5070 (class 2606 OID 27923)
-- Name: course_sections course_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_sections
    ADD CONSTRAINT course_sections_pkey PRIMARY KEY (id);


--
-- TOC entry 5084 (class 2606 OID 36253)
-- Name: google_reviews google_reviews_google_review_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key UNIQUE (google_review_id);


--
-- TOC entry 5086 (class 2606 OID 36255)
-- Name: google_reviews google_reviews_google_review_id_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key1 UNIQUE (google_review_id);


--
-- TOC entry 5088 (class 2606 OID 36219)
-- Name: google_reviews google_reviews_google_review_id_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key10 UNIQUE (google_review_id);


--
-- TOC entry 5090 (class 2606 OID 36221)
-- Name: google_reviews google_reviews_google_review_id_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key11 UNIQUE (google_review_id);


--
-- TOC entry 5092 (class 2606 OID 36223)
-- Name: google_reviews google_reviews_google_review_id_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key12 UNIQUE (google_review_id);


--
-- TOC entry 5094 (class 2606 OID 36245)
-- Name: google_reviews google_reviews_google_review_id_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key13 UNIQUE (google_review_id);


--
-- TOC entry 5096 (class 2606 OID 36241)
-- Name: google_reviews google_reviews_google_review_id_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key14 UNIQUE (google_review_id);


--
-- TOC entry 5098 (class 2606 OID 36243)
-- Name: google_reviews google_reviews_google_review_id_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key15 UNIQUE (google_review_id);


--
-- TOC entry 5100 (class 2606 OID 36227)
-- Name: google_reviews google_reviews_google_review_id_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key16 UNIQUE (google_review_id);


--
-- TOC entry 5102 (class 2606 OID 36229)
-- Name: google_reviews google_reviews_google_review_id_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key17 UNIQUE (google_review_id);


--
-- TOC entry 5104 (class 2606 OID 36231)
-- Name: google_reviews google_reviews_google_review_id_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key18 UNIQUE (google_review_id);


--
-- TOC entry 5106 (class 2606 OID 36263)
-- Name: google_reviews google_reviews_google_review_id_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key19 UNIQUE (google_review_id);


--
-- TOC entry 5108 (class 2606 OID 36257)
-- Name: google_reviews google_reviews_google_review_id_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key2 UNIQUE (google_review_id);


--
-- TOC entry 5110 (class 2606 OID 36239)
-- Name: google_reviews google_reviews_google_review_id_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key20 UNIQUE (google_review_id);


--
-- TOC entry 5112 (class 2606 OID 36237)
-- Name: google_reviews google_reviews_google_review_id_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key21 UNIQUE (google_review_id);


--
-- TOC entry 5114 (class 2606 OID 36265)
-- Name: google_reviews google_reviews_google_review_id_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key22 UNIQUE (google_review_id);


--
-- TOC entry 5116 (class 2606 OID 36235)
-- Name: google_reviews google_reviews_google_review_id_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key23 UNIQUE (google_review_id);


--
-- TOC entry 5118 (class 2606 OID 36233)
-- Name: google_reviews google_reviews_google_review_id_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key24 UNIQUE (google_review_id);


--
-- TOC entry 5120 (class 2606 OID 36225)
-- Name: google_reviews google_reviews_google_review_id_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key25 UNIQUE (google_review_id);


--
-- TOC entry 5122 (class 2606 OID 36267)
-- Name: google_reviews google_reviews_google_review_id_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key26 UNIQUE (google_review_id);


--
-- TOC entry 5124 (class 2606 OID 36269)
-- Name: google_reviews google_reviews_google_review_id_key27; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key27 UNIQUE (google_review_id);


--
-- TOC entry 5126 (class 2606 OID 36213)
-- Name: google_reviews google_reviews_google_review_id_key28; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key28 UNIQUE (google_review_id);


--
-- TOC entry 5128 (class 2606 OID 36211)
-- Name: google_reviews google_reviews_google_review_id_key29; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key29 UNIQUE (google_review_id);


--
-- TOC entry 5130 (class 2606 OID 36259)
-- Name: google_reviews google_reviews_google_review_id_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key3 UNIQUE (google_review_id);


--
-- TOC entry 5132 (class 2606 OID 36271)
-- Name: google_reviews google_reviews_google_review_id_key30; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key30 UNIQUE (google_review_id);


--
-- TOC entry 5134 (class 2606 OID 36209)
-- Name: google_reviews google_reviews_google_review_id_key31; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key31 UNIQUE (google_review_id);


--
-- TOC entry 5136 (class 2606 OID 36261)
-- Name: google_reviews google_reviews_google_review_id_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key4 UNIQUE (google_review_id);


--
-- TOC entry 5138 (class 2606 OID 36215)
-- Name: google_reviews google_reviews_google_review_id_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key5 UNIQUE (google_review_id);


--
-- TOC entry 5140 (class 2606 OID 36251)
-- Name: google_reviews google_reviews_google_review_id_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key6 UNIQUE (google_review_id);


--
-- TOC entry 5142 (class 2606 OID 36217)
-- Name: google_reviews google_reviews_google_review_id_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key7 UNIQUE (google_review_id);


--
-- TOC entry 5144 (class 2606 OID 36247)
-- Name: google_reviews google_reviews_google_review_id_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key8 UNIQUE (google_review_id);


--
-- TOC entry 5146 (class 2606 OID 36249)
-- Name: google_reviews google_reviews_google_review_id_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_google_review_id_key9 UNIQUE (google_review_id);


--
-- TOC entry 5148 (class 2606 OID 31763)
-- Name: google_reviews google_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.google_reviews
    ADD CONSTRAINT google_reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 5074 (class 2606 OID 28485)
-- Name: popups popups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.popups
    ADD CONSTRAINT popups_pkey PRIMARY KEY (id);


--
-- TOC entry 5066 (class 2606 OID 27716)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 5068 (class 2606 OID 27879)
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (key);


--
-- TOC entry 5076 (class 2606 OID 28552)
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- TOC entry 5149 (class 2606 OID 36050)
-- Name: course_section_items course_section_items_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_section_items
    ADD CONSTRAINT course_section_items_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.course_sections(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-07-20 17:33:48

--
-- PostgreSQL database dump complete
--

\unrestrict eGINp36TdbxebJUD1HvUDWFhc6GGcFa1gQWQKHoAJCdxY1PXXD9Doc0YF12AnCm


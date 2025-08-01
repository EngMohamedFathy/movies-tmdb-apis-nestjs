--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-07-31 22:08:03

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
-- TOC entry 228 (class 1259 OID 16991)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16990)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO postgres;

--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 227
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- TOC entry 222 (class 1259 OID 16960)
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.client OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16959)
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_id_seq OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 221
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- TOC entry 218 (class 1259 OID 16943)
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    "tmdbId" integer,
    name character varying NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16942)
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genre_id_seq OWNER TO postgres;

--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 217
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- TOC entry 226 (class 1259 OID 16980)
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    "tmdbId" integer,
    title character varying NOT NULL,
    overview text,
    "releaseDate" timestamp without time zone,
    "posterPath" character varying,
    "voteAverage" double precision,
    "voteCount" integer,
    "createdById" integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    slug character varying NOT NULL,
    "averageRating" integer,
    "ratingCount" integer
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17058)
-- Name: movie_genres_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_genres_genre (
    "movieId" integer NOT NULL,
    "genreId" integer NOT NULL
);


ALTER TABLE public.movie_genres_genre OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16979)
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movie_id_seq OWNER TO postgres;

--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 225
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- TOC entry 224 (class 1259 OID 16973)
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    value double precision NOT NULL,
    "movieId" integer,
    "clientId" integer
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16972)
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rating_id_seq OWNER TO postgres;

--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 223
-- Name: rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;


--
-- TOC entry 220 (class 1259 OID 16952)
-- Name: watchlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.watchlist (
    id integer NOT NULL,
    "isFavorite" boolean DEFAULT false NOT NULL,
    "movieId" integer,
    "clientId" integer
);


ALTER TABLE public.watchlist OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16951)
-- Name: watchlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.watchlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.watchlist_id_seq OWNER TO postgres;

--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 219
-- Name: watchlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.watchlist_id_seq OWNED BY public.watchlist.id;


--
-- TOC entry 4780 (class 2604 OID 16994)
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 16963)
-- Name: client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- TOC entry 4771 (class 2604 OID 16946)
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 16983)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- TOC entry 4777 (class 2604 OID 16976)
-- Name: rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 16955)
-- Name: watchlist id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchlist ALTER COLUMN id SET DEFAULT nextval('public.watchlist_id_seq'::regclass);


--
-- TOC entry 4969 (class 0 OID 16991)
-- Dependencies: 228
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id, name, email, password, created_at, updated_at) FROM stdin;
2	admin	admin@email.com	$2b$10$/TvTds4eFHpiHCqxdVsnPuhw/odLDXzsNQ5h5syX1ihShHVWOj0E6	2025-07-30 15:17:28.880383	2025-07-30 15:17:28.880383
\.


--
-- TOC entry 4963 (class 0 OID 16960)
-- Dependencies: 222
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, name, email, password, created_at, updated_at) FROM stdin;
1	Test Client	client@email.com	$2b$10$XJg0F6.Ky9yUqmOLFv.rluU/Pi6vx2UtjTFExmyBPHrMwlsOb9ym6	2025-07-30 16:38:45.532269	2025-07-30 16:38:45.532269
2	test12	test12@mail.com	$2b$10$QDbrgMGFhnfuI57tgG1snuoORXr7N/Y/WWjhYPv.wsZkuzS8HHQGq	2025-07-30 16:41:08.085506	2025-07-30 16:41:08.085506
\.


--
-- TOC entry 4959 (class 0 OID 16943)
-- Dependencies: 218
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genre (id, "tmdbId", name) FROM stdin;
48	28	Action
49	12	Adventure
50	16	Animation
51	35	Comedy
52	80	Crime
53	99	Documentary
54	18	Drama
55	10751	Family
56	14	Fantasy
57	36	History
58	27	Horror
59	10402	Music
60	9648	Mystery
61	10749	Romance
62	878	Science Fiction
63	10770	TV Movie
64	53	Thriller
65	10752	War
66	37	Western
\.


--
-- TOC entry 4967 (class 0 OID 16980)
-- Dependencies: 226
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie (id, "tmdbId", title, overview, "releaseDate", "posterPath", "voteAverage", "voteCount", "createdById", "createdAt", slug, "averageRating", "ratingCount") FROM stdin;
30	1234821	Jurassic World Rebirth	Five years after the events of Jurassic World Dominion, covert operations expert Zora Bennett is contracted to lead a skilled team on a top-secret mission to secure genetic material from the world's three most massive dinosaurs. When Zora's operation intersects with a civilian family whose boating expedition was capsized, they all find themselves stranded on an island where they come face-to-face with a sinister, shocking discovery that's been hidden from the world for decades.	\N	/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg	6.345	851	\N	2025-07-31 17:02:01.299707	jurassic-world-rebirth-36	\N	\N
31	541671	Ballerina	Taking place during the events of John Wick: Chapter 3 – Parabellum, Eve Macarro begins her training in the assassin traditions of the Ruska Roma.	\N	/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg	7.475	1207	\N	2025-07-31 17:02:01.304432	ballerina-25	\N	\N
6	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-30 20:29:24.754074	test-title-4357	\N	\N
7	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-30 20:31:06.404955	test-title	\N	\N
8	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-30 20:32:26.077712	test-title-9474	\N	\N
10	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-30 20:33:46.761436	test-title-35	\N	\N
11	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-30 20:33:48.588732	test-title-93	\N	\N
32	803796	KPop Demon Hunters	When K-pop superstars Rumi, Mira and Zoey aren't selling out stadiums, they're using their secret powers to protect their fans from supernatural threats.	\N	/22AouvwlhlXbe3nrFcjzL24bvWH.jpg	8.497	861	\N	2025-07-31 17:02:01.310299	kpop-demon-hunters-71	\N	\N
9	\N	test title223	test overview 11	\N	\N	\N	\N	2	2025-07-30 20:32:27.930759	test-title223-7309	5	3
12	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-31 12:23:59.142656	test-title-51	\N	\N
13	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-31 12:25:05.387138	test-title-95	\N	\N
14	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-31 15:52:38.550196	test-title-15	\N	\N
15	\N	test title	test overview	\N	\N	\N	\N	2	2025-07-31 15:53:17.372714	test-title-85	\N	\N
18	755898	War of the Worlds	Will Radford is a top cyber-security analyst for Homeland Security who tracks potential threats to national security through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.	\N	/tlqTdabozTVjWEPWUhDRITxKt6R.jpg	4.758	33	\N	2025-07-31 17:02:01.21822	war-of-the-worlds-57	\N	\N
19	1087192	How to Train Your Dragon	On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.	\N	/53dsJ3oEnBhTBVMigWJ9tkA5bzJ.jpg	8.07	1369	\N	2025-07-31 17:02:01.234768	how-to-train-your-dragon-19	\N	\N
20	1311031	Demon Slayer: Kimetsu no Yaiba Infinity Castle	As the Demon Slayer Corps members and Hashira engaged in a group strength training program, the Hashira Training, in preparation for the forthcoming battle against the demons, Muzan Kibutsuji appears at the Ubuyashiki Mansion. With the head of the Demon Corps in danger, Tanjiro and the Hashira rush to the headquarters but are plunged into a deep descent to a mysterious space by the hands of Muzan Kibutsuji.  The destination of where Tanjiro and Demon Slayer Corps have fallen is the demons' stronghold – the Infinity Castle. And so, the battleground is set as the final battle between the Demon Slayer Corps and the demons ignites.	\N	/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg	7	46	\N	2025-07-31 17:02:01.241155	demon-slayer-kimetsu-no-yaiba-infinity-castle-56	\N	\N
21	552524	Lilo & Stitch	The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.	\N	/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg	7.349	1192	\N	2025-07-31 17:02:01.247763	lilo-and-stitch-62	\N	\N
22	1071585	M3GAN 2.0	After the underlying tech for M3GAN is stolen and misused by a powerful defense contractor to create a military-grade weapon known as Amelia, M3GAN's creator Gemma realizes that the only option is to resurrect M3GAN and give her a few upgrades, making her faster, stronger, and more lethal.	\N	/oekamLQrwlJjRNmfaBE4llIvkir.jpg	7.644	556	\N	2025-07-31 17:02:01.255037	m3gan-20-60	\N	\N
23	1263256	Happy Gilmore 2	Happy Gilmore isn't done with golf — not by a long shot. Since his retirement after his first Tour Championship win, Gilmore returns to finance his daughter's ballet classes.	\N	/ynT06XivgBDkg7AtbDbX1dJeBGY.jpg	6.771	338	\N	2025-07-31 17:02:01.261493	happy-gilmore-2-30	\N	\N
24	617126	The Fantastic 4: First Steps	Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroes with the strength of their family bond, while defending Earth from a ravenous space god called Galactus and his enigmatic Herald, Silver Surfer.	\N	/x26MtUlwtWD26d0G0FXcppxCJio.jpg	7.357	646	\N	2025-07-31 17:02:01.266658	the-fantastic-4-first-steps-72	\N	\N
25	1124619	Bride Hard	Sam is a secret agent whose toughest mission to date is pleasing her bride-to-be best friend at a lavish destination wedding. When a team of mercenaries crashes the party and takes the guests hostage, Sam is thrown into a fight unlike any before — one where she can’t risk blowing her cover or ruining the big day. As she takes on the bad guys in a high-stakes battle disguised as a fairy-tale affair, she realizes the real threat might be closer than she thinks.	\N	/3mExdWLSxAiUCb4NMcYmxSkO7n4.jpg	6.222	45	\N	2025-07-31 17:02:01.271997	bride-hard-22	\N	\N
26	1061474	Superman	Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.	\N	/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg	7.436	1301	\N	2025-07-31 17:02:01.277908	superman-79	\N	\N
27	1119878	Ice Road: Vengeance	Big rig ice road driver Mike McCann travels to Nepal to scatter his late brother’s ashes on Mt. Everest. While on a packed tour bus traversing the deadly 12,000 ft. terrain of the infamous Road to the Sky, McCann and his mountain guide encounter a group of mercenaries and must fight to save themselves, the busload of innocent travelers, and the local villagers’ homeland.	\N	/cQN9rZj06rXMVkk76UF1DfBAico.jpg	6.834	151	\N	2025-07-31 17:02:01.284425	ice-road-vengeance-37	\N	\N
28	1315986	Man with No Past	Waking up in an unfamiliar city, a man with no memory must confront the mysteries of his own identity. However, his desperate search to uncover the past pits him against a powerful enemy, leading to a showdown that ultimately reveals the truth.	\N	/eWHvROuznSzcxBAAkzX1X0Rmzoe.jpg	6.683	41	\N	2025-07-31 17:02:01.290519	man-with-no-past-72	\N	\N
29	1011477	Karate Kid: Legends	After a family tragedy, kung fu prodigy Li Fong is uprooted from his home in Beijing and forced to move to New York City with his mother. When a new friend needs his help, Li enters a karate competition – but his skills alone aren't enough. Li's kung fu teacher Mr. Han enlists original Karate Kid Daniel LaRusso for help, and Li learns a new way to fight, merging their two styles into one for the ultimate martial arts showdown.	\N	/AEgggzRr1vZCLY86MAp93li43z.jpg	7.183	576	\N	2025-07-31 17:02:01.295658	karate-kid-legends-11	\N	\N
33	986056	Thunderbolts*	After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.	\N	/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg	7.418	2070	\N	2025-07-31 17:02:01.314599	thunderbolts-45	\N	\N
34	574475	Final Destination Bloodlines	Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.	\N	/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg	7.167	1783	\N	2025-07-31 17:02:01.320454	final-destination-bloodlines-33	\N	\N
35	1374534	Almost Cops	When an overeager community officer and a reckless ex-detective are forced to team up, plenty of chaos ensues on the streets of Rotterdam.	\N	/7bcndiaTgu1Kj5a6qyCmsWYdtI.jpg	5.89	109	\N	2025-07-31 17:02:01.324881	almost-cops-84	\N	\N
36	1285965	Dangerous Animals	A savvy and free-spirited surfer is abducted by a shark-obsessed serial killer. Held captive on his boat, she must figure out how to escape before he carries out a ritualistic feeding to the sharks below.	\N	/oQJ1PKLIE2gF5cr3xwjLCvv4jcU.jpg	6.504	112	\N	2025-07-31 17:02:01.329713	dangerous-animals-99	\N	\N
37	1058537	Angels Fallen: Warriors of Peace	When an Iraq War veteran receives a calling from a higher power, he embarks on a mission to stop a fallen angel from raising an army of the dead to take over the world.	\N	/dKdKUSGQ9E0G73WPr9xIHrofpkT.jpg	5.908	38	\N	2025-07-31 17:02:01.335483	angels-fallen-warriors-of-peace-61	\N	\N
44	1100988	28 Years Later	Twenty-eight years since the rage virus escaped a biological weapons laboratory, now, still in a ruthlessly enforced quarantine, some have found ways to exist amidst the infected. One such group lives on a small island connected to the mainland by a single, heavily-defended causeway. When one member departs on a mission into the dark heart of the mainland, he discovers secrets, wonders, and horrors that have mutated not only the infected but other survivors as well.	\N	/mIg1qCkVxnAlM2TK3RUF0tdEXlE.jpg	7	713	\N	2025-07-31 17:39:36.230322	28-years-later-29	\N	\N
45	846422	The Old Guard 2	Andy and her team of immortal warriors fight with renewed purpose as they face a powerful new foe threatening their mission to protect humanity.	\N	/wqfu3bPLJaEWJVk3QOm0rKhxf1A.jpg	6.038	574	\N	2025-07-31 17:39:36.248459	the-old-guard-2-84	\N	\N
46	1391047	Control Room	A distant space colony where Olivia and her colleague Arlo is in charge of the colony's control room, ensuring the safety and well-being of the community. But the colony comes under siege from alien creatures.	\N	/4JSKy8aFyzHQYqi1998wLIBedrw.jpg	5.3	10	\N	2025-07-31 17:39:36.254893	control-room-71	\N	\N
47	7451	xXx	Xander Cage is your standard adrenaline junkie with no fear and a lousy attitude. When the US Government "recruits" him to go on a mission, he's not exactly thrilled. His mission: to gather information on an organization that may just be planning the destruction of the world, led by the nihilistic Yorgi.	\N	/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg	6	4491	\N	2025-07-31 17:39:36.263406	xxx-21	\N	\N
48	749170	Heads of State	The UK Prime Minister and US President have a public rivalry that risks their countries' alliance. But when they become targets of a powerful enemy, they're forced to rely on each other as they go on a wild, multinational run. Allied with Noel, a brilliant MI6 agent, they must find a way to thwart a conspiracy that threatens the free world.	\N	/lVgE5oLzf7ABmzyASEVcjYyHI41.jpg	6.967	598	\N	2025-07-31 17:39:36.2714	heads-of-state-57	\N	\N
49	911430	F1	Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.	\N	/6H6p82aWQFEKEuVUiZll6JxV8Ft.jpg	7.613	940	\N	2025-07-31 17:39:36.278641	f1-19	\N	\N
50	1241634	Saiyaara	Two artistic souls find harmony through music despite their contrasting worlds. As feelings deepen, age and circumstances challenge their undeniable bond.	\N	/jymezcmEcFvlb037V4SSx8a4SMq.jpg	6.282	71	\N	2025-07-31 17:39:36.284564	saiyaara-90	\N	\N
51	1136867	Materialists	A young, ambitious New York City matchmaker finds herself torn between the perfect match and her imperfect ex.	\N	/eDo0pNruy0Qgj6BdTyHIR4cxHY8.jpg	6.774	226	\N	2025-07-31 17:39:36.288955	materialists-91	\N	\N
52	1026222	Saint Clare	In a small town a solitary woman is haunted by voices that lead her to assassinate ill intended people and get away with it, until her last kill sucks her down a rabbit hole riddled with corruption, trafficking and visions from the beyond.	\N	/aE0q4awk7zto3Eql4cAeJuVAns9.jpg	5.2	13	\N	2025-07-31 17:39:36.294915	saint-clare-98	\N	\N
53	1151031	Bring Her Back	Following the death of their father, a brother and sister are introduced to their new sibling by their foster mother, only to learn that she has a terrifying secret.	\N	/tObSf1VzzHt9xB0csanFtb3DRjf.jpg	7.5	367	\N	2025-07-31 17:39:36.301889	bring-her-back-98	\N	\N
54	1245934	Séance Games: Metaxu	Social media stars unite to play METAXU, an online séance game, only to find they have unwittingly unleashed the Gates of Hell.	\N	/4CfL5wy0srwNLi6hP9EZVwSAX41.jpg	8	4	\N	2025-07-31 17:39:36.306951	seance-games-metaxu-35	\N	\N
55	1268870	Nudus	As she awakens from a prolonged coma, a woman is shocked to learn all the details of her life her captors her captors have access to.	\N	/7gV1u6ozmtNBuWxfndldwEM4KlN.jpg	7	2	\N	2025-07-31 17:39:36.315093	nudus-82	\N	\N
56	947478	The Green Dinosaur	When the world around him is mysteriously erased, a little green dinosaur named Diplodocus must travel through the pages of a comic book and adventure through time to bring color back to his land. Alongside a wizard and two scientists, Diplo’s plans go awry as he learns that there may be a dimension to his world that he never considered.	\N	/9mnMMiwv20EL5weJrLZCaF8cM2u.jpg	7.2	9	\N	2025-07-31 17:39:36.320437	the-green-dinosaur-92	\N	\N
57	611251	Jokōsei torio: seikan shiken	Three high school girls. One is experienced, one has fantasies and one is curious. What more will they learn before graduation?	\N	/9GSLrU0aoR6Pi2FQ0ttXV2thSxJ.jpg	8	4	\N	2025-07-31 17:39:36.325438	jokosei-torio-seikan-shiken-28	\N	\N
58	1326106	Kaiju No. 8: Mission Recon	In a Kaiju-filled Japan, Kafka Hibino works in monster disposal. After reuniting with his childhood friend Mina Ashiro, a rising star in the anti-Kaiju Defense Force, he decides to pursue his abandoned dream of joining the Force, when he suddenly transforms into the powerful "Kaiju No. 8." An action-packed recap of the first season of Kaiju No. 8 and a new original episode, Hoshina's Day Off.	\N	/1aEfyTWUK8ZBk4aw7Ck0qEoF8PW.jpg	7.767	43	\N	2025-07-31 17:39:36.332416	kaiju-no-8-mission-recon-61	\N	\N
59	9614	Happy Gilmore	Failed hockey player-turned-golf whiz Happy Gilmore — whose unconventional approach and antics on the green courts the ire of rival Shooter McGavin — is determined to win a PGA tournament so he can save his granny's house with the prize money. Meanwhile, an attractive tour publicist tries to soften Happy's image.	\N	/epFP29rGrLPseuKxpz3mGKr23Do.jpg	6.655	2941	\N	2025-07-31 17:39:36.337385	happy-gilmore-62	\N	\N
60	1100998	SuperKlaus	Santa Claus's wish comes true when he accidentally bumps his head and starts believing he's SuperKlaus. With the help of Billie and Leo his elf-xecutive assistant, SuperKlaus will take on a toy-obsessed businessman to save Christmas.	\N	/8sgc5TA8xsi4wpKrf7XrFKscujQ.jpg	6	5	\N	2025-07-31 17:39:36.341794	superklaus-72	\N	\N
61	233651	Sex Rider: Wet Highway	With her wedding only one day away, Mina spends a night with her former lover Ozaki at a highway motel on the outskirts of Yokohama. On her way back from her last adventure, Mina’s car hits a hippie-like youth called Ryo. Shocked by the accident and, moreover, left alone by Ozaki, who hated to be involved in the trouble, Mina places the unconscious youth in the back seat and drives toward a lake...	\N	/jmyo0j2HMDeFvMh5y1wFYpoxH6S.jpg	4.6	10	\N	2025-07-31 17:39:36.346399	sex-rider-wet-highway-82	\N	\N
62	575265	Mission: Impossible - The Final Reckoning	Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.	\N	/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg	7.2	974	\N	2025-07-31 17:39:36.351389	mission-impossible-the-final-reckoning-68	\N	\N
63	615453	Ne Zha	A young boy is born as the reincarnation of a demonic power, into a society that hates and fears him. Destined by prophecy to bring destruction to the world, Nezha must choose between good and evil to see if he can change his fate.	\N	/phM9bb6s9c60LA8qwsdk7U1N2cS.jpg	7.956	573	\N	2025-07-31 17:39:36.355957	ne-zha-30	\N	\N
\.


--
-- TOC entry 4970 (class 0 OID 17058)
-- Dependencies: 229
-- Data for Name: movie_genres_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_genres_genre ("movieId", "genreId") FROM stdin;
44	53
46	53
47	53
48	53
52	53
54	53
55	53
61	53
62	53
\.


--
-- TOC entry 4965 (class 0 OID 16973)
-- Dependencies: 224
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (id, value, "movieId", "clientId") FROM stdin;
1	5	9	\N
2	5	9	\N
3	5	9	\N
\.


--
-- TOC entry 4961 (class 0 OID 16952)
-- Dependencies: 220
-- Data for Name: watchlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.watchlist (id, "isFavorite", "movieId", "clientId") FROM stdin;
\.


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 227
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_id_seq', 2, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 221
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 3, true);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 217
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genre_id_seq', 275, true);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 225
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_id_seq', 63, true);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 223
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 3, true);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 219
-- Name: watchlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.watchlist_id_seq', 2, true);


--
-- TOC entry 4785 (class 2606 OID 16950)
-- Name: genre PK_0285d4f1655d080cfcf7d1ab141; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 16958)
-- Name: watchlist PK_0c8c0dbcc8d379117138e71ad5b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT "PK_0c8c0dbcc8d379117138e71ad5b" PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 16969)
-- Name: client PK_96da49381769303a6515a8785c7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY (id);


--
-- TOC entry 4805 (class 2606 OID 17065)
-- Name: movie_genres_genre PK_aee18568f9fe4ecca74f35891af; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres_genre
    ADD CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId");


--
-- TOC entry 4797 (class 2606 OID 16987)
-- Name: movie PK_cb3bb4d61cf764dc035cbedd422; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY (id);


--
-- TOC entry 4799 (class 2606 OID 17000)
-- Name: admin PK_e032310bcef831fb83101899b10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY (id);


--
-- TOC entry 4793 (class 2606 OID 16978)
-- Name: rating PK_ecda8ad32645327e4765b43649e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY (id);


--
-- TOC entry 4791 (class 2606 OID 16971)
-- Name: client UQ_6436cc6b79593760b9ef921ef12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE (email);


--
-- TOC entry 4801 (class 2606 OID 17002)
-- Name: admin UQ_de87485f6489f5d0995f5841952; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE (email);


--
-- TOC entry 4802 (class 1259 OID 17067)
-- Name: IDX_1996ce31a9e067304ab168d671; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON public.movie_genres_genre USING btree ("genreId");


--
-- TOC entry 4794 (class 1259 OID 17078)
-- Name: IDX_454288774942b99d5127fb4173; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_454288774942b99d5127fb4173" ON public.movie USING btree (slug);


--
-- TOC entry 4783 (class 1259 OID 17046)
-- Name: IDX_62a0c90aec95f3b2c6d6b7193f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_62a0c90aec95f3b2c6d6b7193f" ON public.genre USING btree ("tmdbId");


--
-- TOC entry 4803 (class 1259 OID 17066)
-- Name: IDX_985216b45541c7e0ec644a8dd4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON public.movie_genres_genre USING btree ("movieId");


--
-- TOC entry 4795 (class 1259 OID 17047)
-- Name: IDX_e67ea82f6973f5b9a6747fba34; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_e67ea82f6973f5b9a6747fba34" ON public.movie USING btree ("tmdbId");


--
-- TOC entry 4811 (class 2606 OID 17073)
-- Name: movie_genres_genre FK_1996ce31a9e067304ab168d6715; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres_genre
    ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES public.genre(id);


--
-- TOC entry 4808 (class 2606 OID 17018)
-- Name: rating FK_1a3badf27affbca3a224f01f7de; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_1a3badf27affbca3a224f01f7de" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


--
-- TOC entry 4810 (class 2606 OID 17034)
-- Name: movie FK_4e9f6e68788d5eae5488a758008; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "FK_4e9f6e68788d5eae5488a758008" FOREIGN KEY ("createdById") REFERENCES public.admin(id);


--
-- TOC entry 4806 (class 2606 OID 17013)
-- Name: watchlist FK_565bdf7f282c9f3ac73bc3d30bd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT "FK_565bdf7f282c9f3ac73bc3d30bd" FOREIGN KEY ("clientId") REFERENCES public.client(id);


--
-- TOC entry 4809 (class 2606 OID 17023)
-- Name: rating FK_675852d5d36ddfe6a47b4f190e7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT "FK_675852d5d36ddfe6a47b4f190e7" FOREIGN KEY ("clientId") REFERENCES public.client(id);


--
-- TOC entry 4812 (class 2606 OID 17068)
-- Name: movie_genres_genre FK_985216b45541c7e0ec644a8dd4e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres_genre
    ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES public.movie(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4807 (class 2606 OID 17008)
-- Name: watchlist FK_e208d245e60584f555df1b35e54; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT "FK_e208d245e60584f555df1b35e54" FOREIGN KEY ("movieId") REFERENCES public.movie(id);


-- Completed on 2025-07-31 22:08:03

--
-- PostgreSQL database dump complete
--


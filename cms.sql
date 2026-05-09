-- =========================================
-- PORTFOLIO V2 CMS DATABASE (PostgreSQL)
-- Shared Database Compatible
-- Prefix: portfoliov2_
-- =========================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================
-- PROFILE DETAILS
-- =========================================

CREATE TABLE portfoliov2_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    code VARCHAR(50),
    name VARCHAR(255),
    location VARCHAR(255),
    location_type VARCHAR(100),

    website TEXT,
    role VARCHAR(255),

    github TEXT,
    linkedin TEXT,
    email VARCHAR(255),
    x TEXT,
    phone VARCHAR(50),

    status VARCHAR(255),
    status_location VARCHAR(255),

    image_link TEXT,
    resume TEXT,
    buy_me_a_coffee TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- CONTACT SECTION
-- =========================================

CREATE TABLE portfoliov2_contact_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    top_head TEXT,
    sub_head TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ABOUT LINES
-- =========================================

CREATE TABLE portfoliov2_about_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    line_order INT NOT NULL,
    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- HEADLINE
-- =========================================

CREATE TABLE portfoliov2_headline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    headline TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfoliov2_headline_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    headline_id UUID REFERENCES portfoliov2_headline(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- BADGES
-- =========================================

CREATE TABLE portfoliov2_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    label VARCHAR(255) NOT NULL,
    sub VARCHAR(255),
    icon VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- PROJECTS
-- =========================================

CREATE TABLE portfoliov2_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    priority_index INT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,

    title VARCHAR(255) NOT NULL,
    subtitle TEXT,

    category VARCHAR(255),
    year VARCHAR(10),

    image TEXT,

    role VARCHAR(255),

    long_description TEXT,

    live_url TEXT,
    repo_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfoliov2_project_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    project_id UUID REFERENCES portfoliov2_projects(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SKILL GROUPS
-- =========================================

CREATE TABLE portfoliov2_skill_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    label VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfoliov2_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    group_id UUID REFERENCES portfoliov2_skill_groups(id) ON DELETE CASCADE,

    name VARCHAR(255) NOT NULL,
    level INT CHECK (level >= 0 AND level <= 100),
    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- TIMELINE
-- =========================================

CREATE TABLE portfoliov2_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    year VARCHAR(50),
    title VARCHAR(255),
    org VARCHAR(255),

    description TEXT,

    side VARCHAR(10) CHECK (side IN ('left', 'right')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- EDUCATION
-- =========================================

CREATE TABLE portfoliov2_education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    degree VARCHAR(255),
    institution VARCHAR(255),

    location VARCHAR(255),

    period VARCHAR(100),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfoliov2_education_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    education_id UUID REFERENCES portfoliov2_education(id) ON DELETE CASCADE,

    achievement TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- STATS
-- =========================================

CREATE TABLE portfoliov2_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    value VARCHAR(100),
    label VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SOCIAL LINKS
-- =========================================

CREATE TABLE portfoliov2_social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    label VARCHAR(100),
    handle VARCHAR(255),

    href TEXT,

    icon VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- CMS USERS
-- =========================================

CREATE TABLE portfoliov2_cms_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(50) DEFAULT 'admin',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_portfoliov2_projects_slug
ON portfoliov2_projects(slug);

CREATE INDEX idx_portfoliov2_projects_priority
ON portfoliov2_projects(priority_index);

CREATE INDEX idx_portfoliov2_skills_group_id
ON portfoliov2_skills(group_id);

CREATE INDEX idx_portfoliov2_project_tags_project_id
ON portfoliov2_project_tags(project_id);

CREATE INDEX idx_portfoliov2_education_achievements_education_id
ON portfoliov2_education_achievements(education_id);

-- =========================================
-- UPDATED_AT TRIGGER FUNCTION
-- =========================================

CREATE OR REPLACE FUNCTION portfoliov2_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- =========================================
-- TRIGGERS
-- =========================================

CREATE TRIGGER trg_portfoliov2_profile_updated_at
BEFORE UPDATE ON portfoliov2_profile
FOR EACH ROW
EXECUTE FUNCTION portfoliov2_update_updated_at_column();

CREATE TRIGGER trg_portfoliov2_projects_updated_at
BEFORE UPDATE ON portfoliov2_projects
FOR EACH ROW
EXECUTE FUNCTION portfoliov2_update_updated_at_column();

CREATE TRIGGER trg_portfoliov2_contact_content_updated_at
BEFORE UPDATE ON portfoliov2_contact_content
FOR EACH ROW
EXECUTE FUNCTION portfoliov2_update_updated_at_column();

CREATE TRIGGER trg_portfoliov2_headline_updated_at
BEFORE UPDATE ON portfoliov2_headline
FOR EACH ROW
EXECUTE FUNCTION portfoliov2_update_updated_at_column();
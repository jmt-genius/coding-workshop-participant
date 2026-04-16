-- Talent Pool: 5 new joinee employees with no team, no project, no manager
-- These employees are in the talent pool waiting to be assigned.

-- Users (password is same as other seeded users)
INSERT INTO public."User" (id, email, "passwordHash", name, role, "createdAt") VALUES
('tp-001-aaaa-bbbb-cccc-ddddeeee0001', 'priya.sharma@luminous.com', '$pbkdf2-sha256$29000$BiAkJGRsbY3ROse4F0IoxQ$TTebbcn9zLevFlRvJ6MU9p5qfka4jbM//oEeCVbWeWA', 'Priya Sharma', 'EMPLOYEE', '2026-04-16 09:00:00.000'),
('tp-002-aaaa-bbbb-cccc-ddddeeee0002', 'daniel.okafor@luminous.com', '$pbkdf2-sha256$29000$BiAkJGRsbY3ROse4F0IoxQ$TTebbcn9zLevFlRvJ6MU9p5qfka4jbM//oEeCVbWeWA', 'Daniel Okafor', 'EMPLOYEE', '2026-04-16 09:00:00.000'),
('tp-003-aaaa-bbbb-cccc-ddddeeee0003', 'mei.lin@luminous.com', '$pbkdf2-sha256$29000$BiAkJGRsbY3ROse4F0IoxQ$TTebbcn9zLevFlRvJ6MU9p5qfka4jbM//oEeCVbWeWA', 'Mei Lin', 'EMPLOYEE', '2026-04-16 09:00:00.000'),
('tp-004-aaaa-bbbb-cccc-ddddeeee0004', 'james.whitfield@luminous.com', '$pbkdf2-sha256$29000$BiAkJGRsbY3ROse4F0IoxQ$TTebbcn9zLevFlRvJ6MU9p5qfka4jbM//oEeCVbWeWA', 'James Whitfield', 'EMPLOYEE', '2026-04-16 09:00:00.000'),
('tp-005-aaaa-bbbb-cccc-ddddeeee0005', 'sofia.martinez@luminous.com', '$pbkdf2-sha256$29000$BiAkJGRsbY3ROse4F0IoxQ$TTebbcn9zLevFlRvJ6MU9p5qfka4jbM//oEeCVbWeWA', 'Sofia Martinez', 'EMPLOYEE', '2026-04-16 09:00:00.000')
ON CONFLICT (id) DO NOTHING;

-- Employee Profiles (no teamId, no projectId — talent pool)
INSERT INTO public."EmployeeProfile" (id, "userId", "teamId", "projectId", specialization, "joinedAt", "updatedAt", "performanceRating", "promotionReady", "attritionRisk") VALUES
('tp-profile-0001', 'tp-001-aaaa-bbbb-cccc-ddddeeee0001', NULL, NULL, 'Full Stack Engineer', '2026-04-16 09:00:00.000', '2026-04-16 09:00:00.000', NULL, false, 'LOW'),
('tp-profile-0002', 'tp-002-aaaa-bbbb-cccc-ddddeeee0002', NULL, NULL, 'Cloud Architect', '2026-04-16 09:00:00.000', '2026-04-16 09:00:00.000', NULL, false, 'LOW'),
('tp-profile-0003', 'tp-003-aaaa-bbbb-cccc-ddddeeee0003', NULL, NULL, 'ML Engineer', '2026-04-16 09:00:00.000', '2026-04-16 09:00:00.000', NULL, false, 'LOW'),
('tp-profile-0004', 'tp-004-aaaa-bbbb-cccc-ddddeeee0004', NULL, NULL, 'DevOps Engineer', '2026-04-16 09:00:00.000', '2026-04-16 09:00:00.000', NULL, false, 'LOW'),
('tp-profile-0005', 'tp-005-aaaa-bbbb-cccc-ddddeeee0005', NULL, NULL, 'Frontend Engineer', '2026-04-16 09:00:00.000', '2026-04-16 09:00:00.000', NULL, false, 'LOW')
ON CONFLICT (id) DO NOTHING;

-- Skills
INSERT INTO public."EmployeeSkill" (id, "skillName", proficiency, "profileId") VALUES
-- Priya Sharma - Full Stack
('tp-skill-0001', 'React', 4.5, 'tp-profile-0001'),
('tp-skill-0002', 'Node.js', 4.2, 'tp-profile-0001'),
('tp-skill-0003', 'PostgreSQL', 3.8, 'tp-profile-0001'),
('tp-skill-0004', 'TypeScript', 4.0, 'tp-profile-0001'),
-- Daniel Okafor - Cloud Architect
('tp-skill-0005', 'AWS', 4.8, 'tp-profile-0002'),
('tp-skill-0006', 'Terraform', 4.3, 'tp-profile-0002'),
('tp-skill-0007', 'Kubernetes', 4.0, 'tp-profile-0002'),
('tp-skill-0008', 'Docker', 4.5, 'tp-profile-0002'),
-- Mei Lin - ML Engineer
('tp-skill-0009', 'Python', 4.9, 'tp-profile-0003'),
('tp-skill-0010', 'TensorFlow', 4.2, 'tp-profile-0003'),
('tp-skill-0011', 'PyTorch', 4.0, 'tp-profile-0003'),
('tp-skill-0012', 'SQL', 3.5, 'tp-profile-0003'),
-- James Whitfield - DevOps
('tp-skill-0013', 'CI/CD', 4.5, 'tp-profile-0004'),
('tp-skill-0014', 'Jenkins', 3.8, 'tp-profile-0004'),
('tp-skill-0015', 'Ansible', 4.0, 'tp-profile-0004'),
('tp-skill-0016', 'Linux', 4.7, 'tp-profile-0004'),
-- Sofia Martinez - Frontend
('tp-skill-0017', 'React', 4.6, 'tp-profile-0005'),
('tp-skill-0018', 'Figma', 4.0, 'tp-profile-0005'),
('tp-skill-0019', 'CSS', 4.8, 'tp-profile-0005'),
('tp-skill-0020', 'Accessibility', 3.9, 'tp-profile-0005')
ON CONFLICT (id) DO NOTHING;

-- Trainings
INSERT INTO public."Training" (id, name, description, "completionDate", "profileId") VALUES
-- Priya
('tp-train-0001', 'React Advanced Patterns', 'Completed advanced React design patterns certification.', '2026-03-20 10:00:00.000', 'tp-profile-0001'),
('tp-train-0002', 'Node.js Microservices', 'Built production-grade microservices with Node.js.', '2026-04-01 10:00:00.000', 'tp-profile-0001'),
-- Daniel
('tp-train-0003', 'AWS Solutions Architect', 'AWS Solutions Architect Professional certification.', '2026-02-15 10:00:00.000', 'tp-profile-0002'),
('tp-train-0004', 'Kubernetes Administration', 'CKA certified Kubernetes administrator.', '2026-03-10 10:00:00.000', 'tp-profile-0002'),
-- Mei
('tp-train-0005', 'Deep Learning Specialization', 'Completed Coursera Deep Learning specialization.', '2026-01-20 10:00:00.000', 'tp-profile-0003'),
('tp-train-0006', 'MLOps Fundamentals', 'ML model deployment and monitoring certification.', '2026-03-25 10:00:00.000', 'tp-profile-0003'),
-- James
('tp-train-0007', 'HashiCorp Terraform Associate', 'Terraform infrastructure as code certification.', '2026-02-28 10:00:00.000', 'tp-profile-0004'),
('tp-train-0008', 'Linux Foundation SysAdmin', 'LFCS certified system administrator.', '2026-04-05 10:00:00.000', 'tp-profile-0004'),
-- Sofia
('tp-train-0009', 'Google UX Design Certificate', 'Professional UX design certification from Google.', '2026-03-15 10:00:00.000', 'tp-profile-0005'),
('tp-train-0010', 'Web Accessibility WCAG 2.1', 'Accessibility standards and compliance training.', '2026-04-10 10:00:00.000', 'tp-profile-0005')
ON CONFLICT (id) DO NOTHING;

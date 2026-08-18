-- Lock down SECURITY DEFINER functions from public/anon access
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_ticket_update_permissions() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.validate_uat_plan_update_permissions() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_bootstrap_workspace(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.claim_default_workspace(text) FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.current_email() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.current_member_id(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_workspace_access(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.default_workspace_needs_admin() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_workspace_admin(text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_invited_memberships() FROM PUBLIC, anon;

-- Keep the checks the app and RLS policies actually need for signed-in users
GRANT EXECUTE ON FUNCTION public.current_email() TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_member_id(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_workspace_access(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.default_workspace_needs_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_workspace_admin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_invited_memberships() TO authenticated;

-- Notifications: allow workspace admins/product owners to create notifications,
-- and recipients (or admins) to delete their own notifications
CREATE POLICY "Admins and POs can create notifications"
ON public.notifications FOR INSERT TO authenticated
WITH CHECK (
  public.has_any_role(workspace_id, ARRAY['admin','product_owner']::public.app_role[])
);

CREATE POLICY "Recipients and admins can delete notifications"
ON public.notifications FOR DELETE TO authenticated
USING (
  public.has_role(workspace_id, 'admin')
  OR recipient_member_id = public.current_member_id(workspace_id)
);

-- Ticket relations: allow admins and product owners to update relations
CREATE POLICY "Admins and POs can update ticket relations"
ON public.ticket_relations FOR UPDATE TO authenticated
USING (public.has_any_role(workspace_id, ARRAY['admin','product_owner']::public.app_role[]))
WITH CHECK (public.has_any_role(workspace_id, ARRAY['admin','product_owner']::public.app_role[]));

-- Workspaces: only workspace admins may delete their workspace
CREATE POLICY "Admins can delete their workspace"
ON public.workspaces FOR DELETE TO authenticated
USING (public.has_role(id, 'admin'));